export interface SearchState {
  searchParams: {
    pasajero: string;
    reserva: string;
  };
  page: number;
}

export type SearchAction =
  | { type: "SEARCH"; payload: { pasajero: string; reserva: string } }
  | { type: "SET_PAGE"; payload: number }
  | { type: "CLEAR" };

export const initialSearchState: SearchState = {
  searchParams: { pasajero: "", reserva: "" },
  page: 1,
};

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case "SEARCH":
      return {
        searchParams: action.payload,
        page: 1,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "CLEAR":
      return initialSearchState;
  }
}
