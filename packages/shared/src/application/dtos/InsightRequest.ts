export interface InsightRequest {
  pasajero: string;
  destino: string;
  estado: string;
  fecha_regreso: string;
  clima: {
    description: string;
    temperature: number;
  };
}
