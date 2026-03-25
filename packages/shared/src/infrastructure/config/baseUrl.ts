declare const navigator: { product?: string } | undefined;
declare const window: { location?: { origin?: string } } | undefined;

const LOCAL_PORT = "3000";

function isReactNative(): boolean {
  return (
    typeof navigator !== "undefined" && navigator?.product === "ReactNative"
  );
}

function getExpoHostUri(): string | null {
  try {
    const Constants = require("expo-constants").default;
    const uri = Constants.expoConfig?.hostUri ?? Constants.manifest2?.extra?.expoGo?.debuggerHost;
    if (uri) {
      const host = uri.split(":")[0];
      return `http://${host}:${LOCAL_PORT}`;
    }
  } catch {}
  return null;
}

function isAndroid(): boolean {
  try {
    const { Platform } = require("react-native");
    return Platform.OS === "android";
  } catch {
    return false;
  }
}

export function getBaseUrl(): string {
  if (isReactNative()) {
    const expoUrl = getExpoHostUri();
    if (expoUrl) return expoUrl;

    if (isAndroid()) {
      return `http://10.0.2.2:${LOCAL_PORT}`;
    }
    return `http://localhost:${LOCAL_PORT}`;
  }

  if (typeof window !== "undefined" && window?.location?.origin) {
    return window.location.origin;
  }

  return `http://localhost:${LOCAL_PORT}`;
}
