import { useReducer, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSearchReservations } from "@a365/shared/presentation/hooks/useSearchReservations";
import type { Reservation } from "@a365/shared/domain/entities/Reservation";
import { SearchBar } from "../components/features/SearchBar";
import { ReservationListItem } from "../components/features/reservation-card";
import { EmptyState } from "../components/ui/EmptyState";
import { Pagination } from "../components/features/Pagination";
import { colors, spacing, fontSize } from "../theme/tokens";
import { searchReducer, initialSearchState } from "../reducers/searchReducer";

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const { searchParams, page } = state;

  const hasSearched = Boolean(searchParams.pasajero || searchParams.reserva);

  const { data, isLoading, isError, error, refetch } = useSearchReservations({
    pasajero: searchParams.pasajero || undefined,
    reserva: searchParams.reserva || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleSearch = useCallback(
    (params: { pasajero: string; reserva: string }) => {
      dispatch({ type: "SEARCH", payload: params });
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Reservation }) => (
      <ReservationListItem
        reserva={item.reserva}
        pasajero={item.pasajero}
        destino={item.destino}
        estado={item.estado}
        fechaRegreso={item.fecha_regreso}
      />
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: Reservation) => item.reserva,
    []
  );

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  const renderContent = () => {
    if (!hasSearched) {
      return (
        <EmptyState
          variant="initial"
          title="Busca por nombre de pasajero o numero de reserva"
          subtitle="Los resultados aparecen aqui"
        />
      );
    }

    if (isLoading && !data) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary.default} />
          <Text style={styles.loadingText}>Buscando reservas...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <EmptyState
          variant="error"
          title="Error al buscar reservas"
          subtitle={error?.message ?? "Intente nuevamente"}
          onRetry={() => refetch()}
        />
      );
    }

    if (!data || data.resultados.length === 0) {
      return (
        <EmptyState
          variant="empty"
          title="No se encontraron reservas"
          subtitle="Intenta con otro nombre o numero de reserva"
        />
      );
    }

    return (
      <View style={styles.listContainer}>
        <Text style={styles.resultCount}>
          {data.total} resultado{data.total !== 1 ? "s" : ""}
        </Text>
        <FlashList
          data={data.resultados}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={refetch}
          keyboardDismissMode="on-drag"
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => dispatch({ type: "SET_PAGE", payload: p })}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },
  loadingText: {
    color: colors.text.tertiary,
    fontSize: fontSize.base,
  },
  listContainer: {
    flex: 1,
  },
  resultCount: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
});
