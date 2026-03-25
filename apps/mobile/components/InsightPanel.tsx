import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useWeather } from "@a365/shared/presentation/hooks/useWeather";
import { useInsight } from "@a365/shared/presentation/hooks/useInsight";
import type { Reservation } from "@a365/shared/domain/entities/Reservation";

interface InsightPanelProps {
  reservation: Reservation;
}

export function InsightPanel({ reservation }: InsightPanelProps) {
  const { data: weather } = useWeather(reservation.destino);

  const insightRequest = weather
    ? {
        pasajero: reservation.pasajero,
        destino: reservation.destino,
        estado: reservation.estado,
        fecha_regreso: reservation.fecha_regreso,
        clima: {
          description: weather.description,
          temperature: weather.temperature,
        },
      }
    : null;

  const { data: insight, isLoading, isError } = useInsight(insightRequest);

  if (!weather) return null;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text style={styles.loadingText}>Generando insight...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se pudo generar el insight.
        </Text>
      </View>
    );
  }

  if (!insight) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Insight IA</Text>
      <Text style={styles.message}>{insight.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1d4ed8",
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: "#1e3a5f",
    lineHeight: 18,
  },
  loadingContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: "#3b82f6",
  },
  errorContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fefce8",
    borderRadius: 10,
    borderCurve: "continuous",
  },
  errorText: {
    fontSize: 12,
    color: "#a16207",
  },
});
