import { useEffect, useRef } from "react";
import { Animated, StyleSheet, type ViewStyle } from "react-native";
import { colors, radius } from "../../theme/tokens";

interface SkeletonProps {
  width: number;
  height: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.base, { width, height, opacity }, style]}
      accessibilityLabel="Cargando"
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.border.light,
    borderRadius: radius.sm,
  },
});
