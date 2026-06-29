import { useEffect, useState } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { QueryClientProvider } from "@tanstack/react-query";

import { initDatabase } from "@/db";
import { queryClient } from "@/lib/queryClient";
import { seedDatabase } from "@/seeds";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const db = await initDatabase({ password: "development-secure-key-12345" });
        await seedDatabase(db, { upsert: true });
      } catch (e) {
        console.warn("Database initialization failed:", e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="services" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
