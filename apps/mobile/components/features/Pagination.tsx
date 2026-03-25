import { View, Text, StyleSheet } from "react-native";
import { AnimatedPressable } from "../ui/AnimatedPressable";
import { colors, spacing, fontSize, radius } from "../../theme/tokens";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <View style={styles.container} accessibilityRole="toolbar">
      <AnimatedPressable
        onPress={() => onPageChange(page - 1)}
        disabled={page <= 1}
        style={[styles.button, page <= 1 && styles.disabled]}
        accessibilityLabel="Pagina anterior"
      >
        <Text style={styles.buttonText}>Anterior</Text>
      </AnimatedPressable>
      <Text
        style={styles.info}
        accessibilityLabel={`Pagina ${page} de ${totalPages}`}
      >
        {page} de {totalPages}
      </Text>
      <AnimatedPressable
        onPress={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        style={[styles.button, page >= totalPages && styles.disabled]}
        accessibilityLabel="Pagina siguiente"
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.sm,
    borderCurve: "continuous",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  info: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});
