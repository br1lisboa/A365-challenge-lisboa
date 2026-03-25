import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { ReactNode } from "react";

interface AnimatedPressableProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  accessibilityLabel?: string;
  accessibilityRole?: "button" | "link";
}

export function AnimatedPressable({
  onPress,
  disabled,
  style,
  children,
  accessibilityLabel,
  accessibilityRole = "button",
}: AnimatedPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      style={({ pressed }) => [
        style,
        pressed && !disabled && feedback.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const feedback = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
