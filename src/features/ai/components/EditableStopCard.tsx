import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { PlanStop } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./EditableStopCard.styles";

type Props = {
  stop: PlanStop;
  onRemove: (id: string) => void;
};

function EditableStopCardComponent({ stop, onRemove }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleRemove = useCallback(() => onRemove(stop.id), [onRemove, stop.id]);

  return (
    <View style={styles.card}>
      <View style={styles.handle}>
        <Ionicons
          name="reorder-two-outline"
          size={rf(20)}
          color={theme.colors.textgray}
        />
      </View>

      <View style={styles.logoWrap}>
        {stop.logo ? (
          <Image source={stop.logo} style={styles.logo} resizeMode="contain" />
        ) : (
          <Ionicons name={stop.icon} size={rf(18)} color={theme.colors.viaWhite} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {stop.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {stop.subtitle}
        </Text>
        {stop.meta ? (
          <Text style={styles.meta} numberOfLines={1}>
            {stop.meta}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.remove}
        activeOpacity={0.7}
        onPress={handleRemove}
      >
        <Ionicons name="close" size={rf(16)} color={theme.colors.textgray} />
      </TouchableOpacity>
    </View>
  );
}

export const EditableStopCard = memo(EditableStopCardComponent);
