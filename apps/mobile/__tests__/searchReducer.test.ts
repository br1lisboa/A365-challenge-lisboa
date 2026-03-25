import { describe, it, expect } from "vitest";
import {
  searchReducer,
  initialSearchState,
} from "../reducers/searchReducer";
import type { SearchState } from "../reducers/searchReducer";

describe("searchReducer", () => {
  it("should return initial state", () => {
    expect(initialSearchState).toEqual({
      searchParams: { pasajero: "", reserva: "" },
      page: 1,
    });
  });

  it("should update search params and reset page on SEARCH", () => {
    const prevState: SearchState = {
      searchParams: { pasajero: "Old", reserva: "" },
      page: 3,
    };

    const result = searchReducer(prevState, {
      type: "SEARCH",
      payload: { pasajero: "Ana Torres", reserva: "AX321" },
    });

    expect(result.searchParams).toEqual({
      pasajero: "Ana Torres",
      reserva: "AX321",
    });
    expect(result.page).toBe(1);
  });

  it("should update only page on SET_PAGE", () => {
    const prevState: SearchState = {
      searchParams: { pasajero: "Ana", reserva: "" },
      page: 1,
    };

    const result = searchReducer(prevState, {
      type: "SET_PAGE",
      payload: 5,
    });

    expect(result.page).toBe(5);
    expect(result.searchParams).toEqual(prevState.searchParams);
  });

  it("should reset to initial state on CLEAR", () => {
    const prevState: SearchState = {
      searchParams: { pasajero: "Ana", reserva: "AX321" },
      page: 3,
    };

    const result = searchReducer(prevState, { type: "CLEAR" });

    expect(result).toEqual(initialSearchState);
  });
});
