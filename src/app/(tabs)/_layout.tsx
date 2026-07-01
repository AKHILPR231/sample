import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="navigate" options={{ title: "Navigate" }} />
      <Tabs.Screen name="parking" options={{ title: "Parking" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
      <Tabs.Screen name="brands" options={{ title: "Brands" }} />
    </Tabs>
  );
}
