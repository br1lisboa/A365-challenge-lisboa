import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { SearchBar } from "../../components/features/SearchBar";

describe("SearchBar", () => {
  it("should render input fields with placeholders", () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={false} />);

    expect(screen.getByPlaceholderText("Nombre del pasajero...")).toBeTruthy();
    expect(screen.getByPlaceholderText("N de reserva...")).toBeTruthy();
  });

  it("should call onSearch with trimmed values when pressing search", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Nombre del pasajero..."),
      "Ana Torres"
    );
    fireEvent.press(screen.getByLabelText("Buscar reservas"));

    expect(onSearch).toHaveBeenCalledWith({
      pasajero: "Ana Torres",
      reserva: "",
    });
  });

  it("should have accessibility labels on all interactive elements", () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={false} />);

    expect(screen.getByLabelText("Nombre del pasajero")).toBeTruthy();
    expect(screen.getByLabelText("Numero de reserva")).toBeTruthy();
    expect(screen.getByLabelText("Buscar reservas")).toBeTruthy();
  });
});
