import { View, Text, StyleSheet } from "react-native";
import { useReservationCardContext } from "./ReservationCardContext";
import { colors, spacing, fontSize, fontWeight } from "../../../theme/tokens";

export function Details() {
  const { destino, fechaRegreso } = useReservationCardContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Destino: <Text style={styles.value}>{destino}</Text>
      </Text>
      <Text style={styles.label}>
        Regreso: <Text style={styles.value}>{fechaRegreso}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  value: {
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
});
