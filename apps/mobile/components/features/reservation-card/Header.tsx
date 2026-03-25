import { View, Text, StyleSheet } from "react-native";
import { useReservationCardContext } from "./ReservationCardContext";
import { colors, spacing, fontSize, fontWeight, radius } from "../../../theme/tokens";

export function Header() {
  const { pasajero, reserva, estado } = useReservationCardContext();
  const statusColor = colors.status[estado] ?? colors.status.activa;

  return (
    <View style={styles.container} accessibilityRole="header">
      <View style={styles.left}>
        <Text
          style={styles.name}
          accessibilityLabel={`Pasajero: ${pasajero}`}
        >
          {pasajero}
        </Text>
        <Text style={styles.code}>Reserva: {reserva}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
        <Text style={[styles.badgeText, { color: statusColor.text }]}>
          {estado}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  left: {
    gap: 2,
    flex: 1,
  },
  name: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.lg,
    color: colors.text.primary,
  },
  code: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
