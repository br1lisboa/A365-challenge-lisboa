const LOCAL_PORT = "3000";

function isReactNative(): boolean {
  return (
    typeof navigator !== "undefined" && navigator.product === "ReactNative"
  );
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
    if (isAndroid()) {
      return `http://10.0.2.2:${LOCAL_PORT}`;
    }
    return `http://localhost:${LOCAL_PORT}`;
  }

  if (
    typeof window !== "undefined" &&
    typeof window.location !== "undefined" &&
    window.location.origin !== "undefined"
  ) {
    return window.location.origin;
  }

  return `http://localhost:${LOCAL_PORT}`;
}
