import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../components/SearchBar";

describe("SearchBar", () => {
  it("should render inputs with placeholders", () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} />);

    expect(screen.getByPlaceholderText("Nombre del pasajero...")).toBeDefined();
    expect(screen.getByPlaceholderText("N de reserva...")).toBeDefined();
  });

  it("should call onSearch with trimmed values on submit", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    await user.type(screen.getByPlaceholderText("Nombre del pasajero..."), "Ana Torres");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(onSearch).toHaveBeenCalledWith({
      pasajero: "Ana Torres",
      reserva: "",
    });
  });

  it("should call onClear and reset inputs when clear is clicked", async () => {
    const onClear = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={vi.fn()} onClear={onClear} isLoading={false} />);

    await user.type(screen.getByPlaceholderText("Nombre del pasajero..."), "Test");
    await user.click(screen.getByRole("button", { name: "Limpiar busqueda" }));

    expect(onClear).toHaveBeenCalled();
  });

  it("should not render clear button when onClear is not provided", () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} />);

    expect(screen.queryByRole("button", { name: "Limpiar busqueda" })).toBeNull();
  });
});
