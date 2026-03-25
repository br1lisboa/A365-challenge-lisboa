"use client";

import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface SearchBarProps {
  onSearch: (params: { pasajero: string; reserva: string }) => void;
  onClear?: () => void;
  isLoading: boolean;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SearchBar({ onSearch, onClear, isLoading }: SearchBarProps) {
  const [pasajero, setPasajero] = useState("");
  const [reserva, setReserva] = useState("");

  const canSubmit = Boolean(pasajero.trim() || reserva.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSearch({ pasajero: pasajero.trim(), reserva: reserva.trim() });
  };

  const handleClear = () => {
    setPasajero("");
    setReserva("");
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <Input
        type="text"
        placeholder="Nombre del pasajero..."
        value={pasajero}
        onChange={(e) => setPasajero(e.target.value)}
      />
      <Input
        type="text"
        placeholder="N de reserva..."
        value={reserva}
        onChange={(e) => setReserva(e.target.value)}
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading || !canSubmit} className="flex-1 sm:flex-none">
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>
        {onClear && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
            className="px-3"
            aria-label="Limpiar busqueda"
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    </form>
  );
}
