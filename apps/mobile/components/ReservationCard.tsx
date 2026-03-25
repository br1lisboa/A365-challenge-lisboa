import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Reservation } from "@a365/shared/domain/entities/Reservation";
import { WeatherBadge } from "./WeatherBadge";
import { InsightPanel } from "./InsightPanel";

interface ReservationCardProps {
  reservation: Reservation;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  activa: { bg: "#dcfce7", text: "#15803d" },
  cancelada: { bg: "#fee2e2", text: "#b91c1c" },
  finalizada: { bg: "#f3f4f6", text: "#374151" },
};

export const ReservationCard = memo(function ReservationCard({
  reservation,
}: ReservationCardProps) {
  const statusColor = STATUS_COLORS[reservation.estado] ?? STATUS_COLORS.activa;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{reservation.pasajero}</Text>
          <Text style={styles.code}>Reserva: {reservation.reserva}</Text>
        </View>
        <View
          style={[styles.badge, { backgroundColor: statusColor.bg }]}
        >
          <Text style={[styles.badgeText, { color: statusColor.text }]}>
            {reservation.estado}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailLabel}>
          Destino:{" "}
          <Text style={styles.detailValue}>{reservation.destino}</Text>
        </Text>
        <Text style={styles.detailLabel}>
          Regreso:{" "}
          <Text style={styles.detailValue}>{reservation.fecha_regreso}</Text>
        </Text>
      </View>

      <View style={styles.weatherRow}>
        <WeatherBadge city={reservation.destino} />
      </View>

      <InsightPanel reservation={reservation} />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderCurve: "continuous",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    gap: 2,
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111827",
  },
  code: {
    fontSize: 13,
    color: "#6b7280",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  details: {
    marginTop: 10,
    gap: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  detailValue: {
    fontWeight: "500",
    color: "#111827",
  },
  weatherRow: {
    marginTop: 10,
  },
});
