import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { EmptyState } from "../../components/ui/EmptyState";

describe("EmptyState", () => {
  it("should render title for initial variant", () => {
    render(
      <EmptyState variant="initial" title="Busca por nombre de pasajero" />
    );

    expect(screen.getByText("Busca por nombre de pasajero")).toBeTruthy();
  });

  it("should render title and subtitle for empty variant", () => {
    render(
      <EmptyState
        variant="empty"
        title="No se encontraron reservas"
        subtitle="Intenta con otro nombre"
      />
    );

    expect(screen.getByText("No se encontraron reservas")).toBeTruthy();
    expect(screen.getByText("Intenta con otro nombre")).toBeTruthy();
  });

  it("should render retry button for error variant with onRetry", () => {
    const onRetry = jest.fn();
    render(
      <EmptyState
        variant="error"
        title="Error al buscar"
        onRetry={onRetry}
      />
    );

    expect(screen.getByText("Reintentar")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Reintentar busqueda"));
    expect(onRetry).toHaveBeenCalled();
  });

  it("should not render retry button for non-error variants", () => {
    render(<EmptyState variant="empty" title="Sin resultados" />);

    expect(screen.queryByText("Reintentar")).toBeNull();
  });
});
