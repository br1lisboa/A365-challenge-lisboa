import { memo, useMemo, type ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
  ReservationCardProvider,
  type ReservationCardData,
} from "./ReservationCardContext";
import { Header } from "./Header";
import { Details } from "./Details";
import { Weather } from "./Weather";
import { Insight } from "./Insight";
import { colors, spacing, radius, shadow } from "../../../theme/tokens";

interface ReservationCardProps extends ReservationCardData {
  children?: ReactNode;
}

function ReservationCardRoot({
  reserva,
  pasajero,
  destino,
  estado,
  fechaRegreso,
  children,
}: ReservationCardProps) {
  const value = useMemo<ReservationCardData>(
    () => ({ reserva, pasajero, destino, estado, fechaRegreso }),
    [reserva, pasajero, destino, estado, fechaRegreso]
  );

  return (
    <ReservationCardProvider value={value}>
      <View style={styles.card} accessibilityRole="summary">
        {children}
      </View>
    </ReservationCardProvider>
  );
}

function DefaultLayout(props: ReservationCardData) {
  return (
    <ReservationCardRoot {...props}>
      <Header />
      <Details />
      <Weather />
      <Insight />
    </ReservationCardRoot>
  );
}

export const ReservationListItem = memo(DefaultLayout);

export const ReservationCard = Object.assign(ReservationCardRoot, {
  Header,
  Details,
  Weather,
  Insight,
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    boxShadow: shadow.sm,
  },
});
