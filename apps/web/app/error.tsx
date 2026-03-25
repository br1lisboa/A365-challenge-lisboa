"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-status-error-bg flex items-center justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-status-error-text">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="text-heading text-foreground-primary mb-2">
        Algo salio mal
      </h1>
      <p className="text-body text-foreground-secondary mb-2 max-w-md">
        Ocurrio un error inesperado. Intenta nuevamente o contacta al equipo de soporte.
      </p>
      {error.digest && (
        <p className="text-caption text-foreground-muted mb-6">
          Codigo: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="px-6 py-control-y bg-brand-600 text-foreground-inverse rounded-control hover:bg-brand-700 transition-colors text-body font-medium"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
