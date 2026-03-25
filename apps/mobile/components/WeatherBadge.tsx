import { View, Text, StyleSheet } from "react-native";
import { useWeather } from "@a365/shared/presentation/hooks/useWeather";

interface WeatherBadgeProps {
  city: string;
}

export function WeatherBadge({ city }: WeatherBadgeProps) {
  const { data: weather, isLoading, isError } = useWeather(city);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeleton} />
      </View>
    );
  }

  if (isError || !weather) {
    return (
      <Text style={styles.unavailable}>Clima no disponible</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(weather.temperature)}C</Text>
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
    gap: 8,
  },
  skeleton: {
    height: 16,
    width: 80,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
  temp: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 13,
  },
  description: {
    color: "#6b7280",
    fontSize: 13,
    textTransform: "capitalize",
  },
  separator: {
    color: "#d1d5db",
    fontSize: 13,
  },
  humidity: {
    color: "#9ca3af",
    fontSize: 11,
  },
  unavailable: {
    color: "#9ca3af",
    fontSize: 11,
  },
});
