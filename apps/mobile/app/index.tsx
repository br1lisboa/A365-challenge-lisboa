import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSearchReservations } from "@a365/shared/presentation/hooks/useSearchReservations";
import type { Reservation } from "@a365/shared/domain/entities/Reservation";
import { SearchBar } from "../components/SearchBar";
import { ReservationCard } from "../components/ReservationCard";
import { EmptyState } from "../components/EmptyState";

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [searchParams, setSearchParams] = useState({
    pasajero: "",
    reserva: "",
  });
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError, error } = useSearchReservations({
    pasajero: searchParams.pasajero || undefined,
    reserva: searchParams.reserva || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleSearch = useCallback(
    (params: { pasajero: string; reserva: string }) => {
      setSearchParams(params);
      setPage(1);
      setHasSearched(true);
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Reservation }) => (
      <ReservationCard reservation={item} />
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
          title="Busca por nombre de pasajero o numero de reserva"
          subtitle="Los resultados aparecen aqui"
        />
      );
    }

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Buscando reservas...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <EmptyState
          title="Error al buscar reservas"
          subtitle={error?.message ?? "Intente nuevamente"}
        />
      );
    }

    if (!data || data.resultados.length === 0) {
      return (
        <EmptyState
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
          estimatedItemSize={220}
          contentContainerStyle={styles.listContent}
        />
        {totalPages > 1 && (
          <View style={styles.pagination}>
            <Pressable
              onPress={() => setPage((p) => p - 1)}
              disabled={page <= 1}
              style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]}
            >
              <Text style={styles.pageButtonText}>Anterior</Text>
            </Pressable>
            <Text style={styles.pageInfo}>
              {page} de {totalPages}
            </Text>
            <Pressable
              onPress={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              style={[
                styles.pageButton,
                page >= totalPages && styles.pageButtonDisabled,
              ]}
            >
              <Text style={styles.pageButtonText}>Siguiente</Text>
            </Pressable>
          </View>
        )}
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
    backgroundColor: "#f9fafb",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#6b7280",
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  resultCount: {
    fontSize: 13,
    color: "#6b7280",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    borderCurve: "continuous",
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    fontSize: 13,
    color: "#374151",
  },
  pageInfo: {
    fontSize: 13,
    color: "#6b7280",
  },
});
