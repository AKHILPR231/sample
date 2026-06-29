import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";

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
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.bold,
          marginBottom: spacing.lg,
        }}
      >
        Home
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/services")}
        accessibilityRole="button"
        accessibilityLabel="Open Services and Info"
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.primary,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: 12,
        }}
      >
        <MaterialCommunityIcons
          name="bell-outline"
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
          Services & Info
        </Text>
      </TouchableOpacity>
    </View>
  );
}
