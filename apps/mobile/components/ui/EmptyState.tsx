import { View, Text, StyleSheet } from "react-native";
import { AnimatedPressable } from "./AnimatedPressable";
import { colors, spacing, fontSize, fontWeight, radius } from "../../theme/tokens";

type EmptyStateVariant = "initial" | "empty" | "error";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  subtitle?: string;
  onRetry?: () => void;
}

export function EmptyState({
  variant = "initial",
  title,
  subtitle,
  onRetry,
}: EmptyStateProps) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {variant === "error" && onRetry ? (
        <AnimatedPressable
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityLabel="Reintentar busqueda"
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing["2xl"],
    paddingHorizontal: spacing["2xl"],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.text.tertiary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.text.placeholder,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary.default,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderCurve: "continuous",
  },
  retryText: {
    color: colors.text.inverse,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
  },
});
