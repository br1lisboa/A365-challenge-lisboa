"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (params: { pasajero: string; reserva: string }) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [pasajero, setPasajero] = useState("");
  const [reserva, setReserva] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasajero.trim() && !reserva.trim()) return;
    onSearch({ pasajero: pasajero.trim(), reserva: reserva.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Nombre del pasajero..."
        value={pasajero}
        onChange={(e) => setPasajero(e.target.value)}
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      <input
        type="text"
        placeholder="N de reserva..."
        value={reserva}
        onChange={(e) => setReserva(e.target.value)}
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      <button
        type="submit"
        disabled={isLoading || (!pasajero.trim() && !reserva.trim())}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
