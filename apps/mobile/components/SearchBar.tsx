import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface SearchBarProps {
  onSearch: (params: { pasajero: string; reserva: string }) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [pasajero, setPasajero] = useState("");
  const [reserva, setReserva] = useState("");

  const canSearch = pasajero.trim() || reserva.trim();

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({ pasajero: pasajero.trim(), reserva: reserva.trim() });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del pasajero..."
        placeholderTextColor="#9ca3af"
        value={pasajero}
        onChangeText={setPasajero}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <TextInput
        style={styles.input}
        placeholder="N de reserva..."
        placeholderTextColor="#9ca3af"
        value={reserva}
        onChangeText={setReserva}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable
        style={[styles.button, !canSearch && styles.buttonDisabled]}
        onPress={handleSearch}
        disabled={isLoading || !canSearch}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    borderCurve: "continuous",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    borderCurve: "continuous",
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
