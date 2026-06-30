import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";

type Shortcut = {
  label: string;
  href: "/services" | "/news";
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const SHORTCUTS: Shortcut[] = [
  { label: "Services & Info", href: "/services", icon: "bell-outline" },
  { label: "News & Events", href: "/news", icon: "newspaper-variant-outline" },
];

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
        gap: spacing.md,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.bold,
          marginBottom: spacing.sm,
        }}
      >
        Home
      </Text>

      {SHORTCUTS.map((shortcut) => (
        <TouchableOpacity
          key={shortcut.href}
          onPress={() => router.push(shortcut.href)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${shortcut.label}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.primary,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: 12,
            minWidth: 220,
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name={shortcut.icon}
            size={20}
            color={colors.background}
          />
          <Text
            style={{
              color: colors.background,
              fontSize: typography.size.md,
              fontWeight: typography.weight.semibold,
              marginLeft: spacing.sm,
            }}
          >
            {shortcut.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
