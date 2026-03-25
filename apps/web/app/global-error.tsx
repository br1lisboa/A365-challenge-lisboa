"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="es">
      <body className="bg-surface-secondary min-h-screen text-foreground-primary flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-status-error-bg flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-status-error-text">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Error critico
        </h1>
        <p className="text-sm text-gray-500 mb-2 max-w-md">
          La aplicacion encontro un error critico. Intenta recargar la pagina.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Codigo: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Recargar
        </button>
      </body>
    </html>
  );
}
