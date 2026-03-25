import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useWeather } from "@a365/shared/presentation/hooks/useWeather";
import { useInsight } from "@a365/shared/presentation/hooks/useInsight";
import { useReservationCardContext } from "./ReservationCardContext";
import { colors, spacing, fontSize, fontWeight, radius } from "../../../theme/tokens";

export function Insight() {
  const { pasajero, destino, estado, fechaRegreso } =
    useReservationCardContext();
  const { data: weather } = useWeather(destino);

  const insightRequest = weather
    ? {
        pasajero,
        destino,
        estado,
        fecha_regreso: fechaRegreso,
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
      <View style={styles.loadingContainer} accessibilityLabel="Generando insight">
        <ActivityIndicator size="small" color={colors.primary.accent} />
        <Text style={styles.loadingText}>Generando insight...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo generar el insight.</Text>
      </View>
    );
  }

  if (!insight) return null;

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Insight de IA: ${insight.message}`}
    >
      <Text style={styles.label}>Insight IA</Text>
      <Text style={styles.message}>{insight.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary.surface,
    borderRadius: radius.md,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: colors.primary.border,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary.dark,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.primary.text,
    lineHeight: 18,
  },
  loadingContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary.surface,
    borderRadius: radius.md,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.primary.accent,
  },
  errorContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.warning.surface,
    borderRadius: radius.md,
    borderCurve: "continuous",
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.warning.text,
  },
});
