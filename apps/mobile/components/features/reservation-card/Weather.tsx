import { View, Text, StyleSheet } from "react-native";
import { useWeather } from "@a365/shared/presentation/hooks/useWeather";
import { useReservationCardContext } from "./ReservationCardContext";
import { Skeleton } from "../../ui/Skeleton";
import { colors, spacing, fontSize, fontWeight } from "../../../theme/tokens";

export function Weather() {
  const { destino } = useReservationCardContext();
  const { data: weather, isLoading, isError } = useWeather(destino);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Skeleton width={120} height={16} />
      </View>
    );
  }

  if (isError || !weather) {
    return (
      <Text style={styles.unavailable} accessibilityLabel="Clima no disponible">
        Clima no disponible
      </Text>
    );
  }

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Clima en ${destino}: ${Math.round(weather.temperature)} grados, ${weather.description}, humedad ${weather.humidity} por ciento`}
    >
      <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.description}>{weather.description}</Text>
      <Text style={styles.separator}>|</Text>
      <Text style={styles.humidity}>Humedad {weather.humidity}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  temp: {
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  description: {
    color: colors.text.tertiary,
    fontSize: fontSize.sm,
    textTransform: "capitalize",
  },
  separator: {
    color: colors.border.default,
    fontSize: fontSize.sm,
  },
  humidity: {
    color: colors.text.placeholder,
    fontSize: fontSize.sm,
  },
  unavailable: {
    color: colors.text.placeholder,
    fontSize: fontSize.sm,
    marginTop: spacing.md,
  },
});
