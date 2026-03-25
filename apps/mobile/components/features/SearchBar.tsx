import { useState } from "react";
import { View, TextInput, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AnimatedPressable } from "../ui/AnimatedPressable";
import { colors, spacing, fontSize, fontWeight, radius } from "../../theme/tokens";

interface SearchBarProps {
  onSearch: (params: { pasajero: string; reserva: string }) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [pasajero, setPasajero] = useState("");
  const [reserva, setReserva] = useState("");

  const canSearch = Boolean(pasajero.trim() || reserva.trim());

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({ pasajero: pasajero.trim(), reserva: reserva.trim() });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del pasajero..."
        placeholderTextColor={colors.text.placeholder}
        value={pasajero}
        onChangeText={setPasajero}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        accessibilityLabel="Nombre del pasajero"
        accessibilityHint="Ingresa el nombre para buscar reservas"
      />
      <TextInput
        style={styles.input}
        placeholder="N de reserva..."
        placeholderTextColor={colors.text.placeholder}
        value={reserva}
        onChangeText={setReserva}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        accessibilityLabel="Numero de reserva"
        accessibilityHint="Ingresa el numero de reserva para buscar"
      />
      <AnimatedPressable
        style={[styles.button, !canSearch && styles.buttonDisabled]}
        onPress={handleSearch}
        disabled={isLoading || !canSearch}
        accessibilityLabel={isLoading ? "Buscando" : "Buscar reservas"}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    borderCurve: "continuous",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    backgroundColor: colors.surface,
    color: colors.text.primary,
  },
  button: {
    backgroundColor: colors.primary.default,
    borderRadius: radius.md,
    borderCurve: "continuous",
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.text.inverse,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
  },
});
