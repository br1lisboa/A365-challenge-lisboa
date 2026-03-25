import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="text-6xl font-bold text-brand-500 mb-4">404</div>
      <h1 className="text-heading text-foreground-primary mb-2">
        Pagina no encontrada
      </h1>
      <p className="text-body text-foreground-secondary mb-8 max-w-md">
        La pagina que buscas no existe o fue movida. Verifica la URL o vuelve al inicio.
      </p>
      <Link
        href="/"
        className="px-6 py-control-y bg-brand-600 text-foreground-inverse rounded-control hover:bg-brand-700 transition-colors text-body font-medium"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
