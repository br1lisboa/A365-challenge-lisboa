# A365 Agent Assistant

Imagine que sos un agente de asistencia al viajero. Tenes decenas de pasajeros activos en distintos destinos y necesitas asistirlos rapido. Esta app te deja buscar una reserva, ver como esta el clima en el destino del pasajero y recibir un insight generado por IA que te sugiere como ayudarlo mejor, todo en una sola pantalla.

La construi como monorepo con una version web y una mobile, compartiendo toda la logica de negocio desde un paquete central.

## Tech Stack

| Capa     | Tecnologia                                                                 |
| -------- | -------------------------------------------------------------------------- |
| Monorepo | Turborepo + pnpm workspaces                                                |
| Web      | Next.js 16.2 (App Router) + Tailwind CSS + React 19.1                      |
| Mobile   | Expo SDK 54 + Expo Router 6 + FlashList 2 + React Native 0.81 + React 19.1 |
| Shared   | TypeScript strict + TanStack Query + DDD                                   |
| IA       | Google Gemini 2.0 Flash via OpenRouter                                     |
| Tests    | Vitest + Jest (38 tests)                                                   |

## Como levantar el proyecto

### Requisitos

- Node.js 18+
- pnpm 9+
- Expo Go en el celular (si queres probar mobile)

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crear el archivo `apps/web/.env.local` con estas keys:

```bash
OPENROUTER_API_KEY=
A365_WEATHER_AUTH_KEY=
```

### 3. Levantar la web

```bash
pnpm dev:web
```

Abri http://localhost:3000 y ya podes buscar reservas, ver el clima del destino y los insights de IA.

### 4. Levantar mobile

```bash
pnpm dev:mobile
```

Escanea el QR con Expo Go desde el celular. Bajar expo Go en el dispositivo.

**La web tiene que estar corriendo para que mobile funcione.** La app mobile no habla directamente con las APIs externas. Usa las API routes de Next.js como proxy para el clima y los insights. Esto tiene sentido porque la API de clima necesita un header de autenticacion que no deberia quedar expuesto en el cliente, y la de IA necesita una key que tiene que vivir en el servidor. Por eso mobile depende de que la web este levantada en la misma red.

### 5. Correr tests

```bash
pnpm test
```

Son 38 tests en total: 17 en el paquete shared (mappers, use cases, repositories), 10 en web (API routes y componentes) y 11 en mobile (reducer y componentes).

## Arquitectura

```
packages/shared/src/
├── domain/           Entidades e interfaces de repositorio
├── application/      Casos de uso y DTOs
├── infrastructure/   Implementaciones contra las APIs + Mappers
└── presentation/     Hooks de React con TanStack Query
```

Toda la logica de negocio vive en `packages/shared`. Las dos apps importan los mismos hooks, que usan los mismos casos de uso, que llaman a los mismos repositorios. Lo unico que cambia entre web y mobile es la interfaz.

### Por que DDD

No elegi DDD por moda. Lo necesitaba para que la misma logica corra en dos plataformas sin duplicar nada. La separacion en capas me permite:

- **Domain**: definir las entidades (Reservation, Weather, Insight) y los contratos de cada repositorio, sin que nada dependa de un framework.
- **Application**: orquestar la logica a traves de casos de uso claros: `SearchReservations`, `GetDestinationWeather`, `GenerateInsight`.
- **Infrastructure**: concentrar las llamadas a APIs externas en un solo lugar. Si manana cambia el proveedor de clima, solo toco esta capa.
- **Presentation**: exponer todo con hooks de TanStack Query que manejan loading, error y cache. Esto es lo que las apps consumen directamente.

### Como fluyen los datos

```
SearchBar → useSearchReservations → SearchReservations (use case) → ReservationApiRepository → API externa
    ↓
ReservationCard
    ├── useWeather → GetDestinationWeather → WeatherApiRepository → /api/weather → API A365
    └── useInsight → GenerateInsight → InsightApiRepository → /api/insight → OpenRouter/Gemini
```

Un detalle importante: el insight espera a que el clima termine de cargar antes de pedirse. Asi el prompt que le llega a la IA incluye datos reales del clima actual, no placeholders.

## Uso de IA: donde mas investigacion hubo, el core del mini-challenge

### Que hace

Cada reserva recibe un insight unico generado en el momento. No es un template ni un texto fijo. La IA toma cinco datos en tiempo real:

1. Nombre del pasajero
2. Destino
3. Estado de la reserva
4. Fecha de regreso
5. Clima actual del destino

Y genera un mensaje pensado para el agente (no para el pasajero) con sugerencias concretas de como asistirlo.

### Prompt Engineering

El prompt fue lo que mas itere de todo el proyecto. Arranque con algo generico del estilo "genera un insight para esta reserva" y las respuestas eran vagas, impersonales y a veces le hablaban directo al pasajero. Fui refinando hasta llegar a algo que funciona consistentemente bien:

**Le di un rol claro al modelo.** Le digo que es un asistente interno para agentes de A365, y que el mensaje va dirigido al agente, no al pasajero. Este cambio fue el mas impactante: paso de generar "Recorda llevar abrigo" a "Podrias sugerirle que lleve abrigo". Parece sutil pero cambia completamente la utilidad del insight.

**Le pedi una estructura concreta.** Dos bloques: primero la situacion del pasajero en una oracion, despues 2-3 sugerencias para el agente. Sin esta guia, el modelo tendia a divagar o generar texto generico que no aportaba nada.

**Incluí un ejemplo real.** Un caso concreto con Ana Torres en Madrid, 6 grados, cielo despejado, y la respuesta esperada completa. Esto ancla el tono, la extension y el formato mucho mejor que cualquier instruccion abstracta. El modelo entiende "hace algo como esto" mejor que "se conciso y profesional".

**Hice el prompt del usuario compacto.** Los datos van en una sola linea (`Datos: Pasajero: X, Destino: Y...`) seguida de `Respuesta:`. Esto replica la estructura del ejemplo y le indica al modelo que arranque a responder directamente, sin preambulos.

**Ajuste los parametros pensando en el caso de uso.** Temperature en 0.8 porque quiero variedad en las sugerencias (si todos los insights de destinos frios dicen "visita un museo", no sirve). Max tokens en 250 para que tenga espacio para 3-4 oraciones pero no se extienda de mas.

### El prompt completo

```
System: Eres un asistente interno para agentes de asistencia al viajero de Assist-365.
Generás un mensaje breve dirigido al agente (no al pasajero) para que pueda asistir mejor.

Estructura del mensaje:
1. Situación: nombrar al pasajero, su destino y el clima actual (1 oración).
2. Sugerencias para el agente: 2-3 recomendaciones concretas que el agente puede
   hacerle al pasajero según el clima y el estado del viaje (1-2 oraciones).

Tono: profesional pero cercano, como un compañero de trabajo que te ayuda.
Usá "podrías sugerirle", "es buen momento para recomendarle".
Extensión: máximo 3-4 oraciones. Texto plano en español, sin markdown ni bullets.

Ejemplo:
Datos: Pasajero: Ana Torres, Destino: Madrid, Estado: confirmada, Regreso: 2025-02-10,
       Clima: cielo despejado, 6°C
Respuesta: La pasajera Ana Torres se encuentra en Madrid con clima frío y cielo despejado
(6°C). Podrías sugerirle abrigarse bien para recorrer el Retiro o la Gran Vía, aprovechar
para visitar el Museo del Prado en las horas más frías y llevar una bufanda para las tardes.
Como su viaje finaliza pronto, también es buen momento para recordarle los datos de su
vuelo de regreso.
```

```
User: Datos: Pasajero: {nombre}, Destino: {destino}, Estado: {estado},
      Regreso: {fecha}, Clima: {descripcion}, {temp}°C
      Respuesta:
```

### Por que Gemini y no Claude

La idea original era usar Claude, pero me encontre con un tema de billing en la API de Anthropic. En vez de trabar el desarrollo, pivotee a OpenRouter que me da acceso a Gemini 2.0 Flash con una sola key gratuita. Para mensajes cortos en español funciona muy bien, es rapido y el costo es practicamente cero.

### Cuando algo sale mal

Pense bastante en que pasa cuando la IA falla, porque en una herramienta interna no podes dejar al agente colgado:

- Mientras se genera el insight, se muestra un skeleton animado para que se entienda que algo esta cargando.
- Si el insight ya se genero en los ultimos 10 minutos, se usa el cache en vez de volver a pedirlo.
- El insight solo se dispara cuando el clima ya cargo, asi nunca le mandamos datos incompletos al modelo.
- Si falla, se reintenta una vez. Si vuelve a fallar, la card sigue mostrando toda la info de la reserva y el clima. El insight es un bonus, no un punto de falla.

## Decisiones de diseno

### Web

- **Dark mode** con CSS variables y toggle que se persiste entre sesiones. Para que no se vea un flash del tema equivocado al recargar, hay un script que lee la preferencia antes de que el browser pinte la pagina.
- **InsightPanel carga lazy** con `next/dynamic` para que no bloquee el render inicial de cada card.
- **Pagina principal como Server Component** con Suspense boundary para el contenido interactivo.
- **Componentes reutilizables** (Button, Input, Card, Badge, Skeleton) con variantes por props, estilo chameleon.

### Mobile

- **FlashList** en vez de FlatList porque rinde mejor en listas largas y virtualizadas.
- **Compound Component** para la ReservationCard: un Context provee los datos y cada sub-componente (Header, Details, Weather, Insight) consume lo que necesita. Esto hace que las piezas sean independientes y testeables.
- **Tokens de diseno centralizados** en `theme/tokens.ts`. No hay ni un solo color hardcodeado en los componentes, todo sale del sistema de tokens.
- **useReducer** para manejar el estado de busqueda, extraido a su propio archivo para poder testearlo como logica pura, sin montar componentes.
- **Memoizacion efectiva**: el item de la lista recibe props primitivas (strings), no objetos. Asi `React.memo` realmente puede comparar y evitar re-renders innecesarios.

### Tests

```
packages/shared/    17 tests — mappers, use cases, repositories
apps/web/           10 tests — API routes (weather, insight), SearchBar
apps/mobile/        11 tests — searchReducer, SearchBar, EmptyState
```

## Que mejoraria con mas tiempo

- **Pulir la UI.** El foco estuvo en la arquitectura y la integracion de IA, asi que la interfaz tiene margen para crecer: transiciones mas fluidas, mejor jerarquia visual en las cards, un responsive mas cuidado, microinteracciones que le den vida a la app.
- **Internacionalizacion.** A365 asiste viajeros en todo el mundo, tiene mucho sentido que la herramienta soporte varios idiomas. Los insights de IA ya podrian generarse en el idioma del agente con un cambio minimo en el prompt.
- **Streaming del insight.** Hoy el agente espera a que se genere completo. Con streaming el texto iria apareciendo en tiempo real y la experiencia se sentiria mucho mas rapida.
- **Tests end-to-end** con Playwright para web y Detox para mobile, cubriendo los flujos criticos de busqueda, clima e insight.
- **Rate limiting** en la ruta de insight para proteger el consumo de la API de IA.
- **CI/CD** con GitHub Actions para correr lint, tests y build en cada push.
- **Deteccion automatica de IP en mobile.** Hoy la URL del servidor esta hardcodeada. Lo ideal seria que la app detecte sola la IP de la red local.
