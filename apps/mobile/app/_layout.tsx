import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryProvider } from "../providers/QueryProvider";
import { ErrorBoundary } from "../providers/ErrorBoundary";
import { colors, fontWeight } from "../theme/tokens";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTitleStyle: { fontWeight: fontWeight.bold },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "A365 Agent Assistant" }}
          />
        </Stack>
      </QueryProvider>
    </ErrorBoundary>
  );
}
