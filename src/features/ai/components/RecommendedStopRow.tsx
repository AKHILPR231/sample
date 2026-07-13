import { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type { RecommendedStop } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./RecommendedStopRow.styles";

type Props = {
  stop: RecommendedStop;
  onAdd: (id: string) => void;
};

function RecommendedStopRowComponent({ stop, onAdd }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handleAdd = useCallback(() => onAdd(stop.id), [onAdd, stop.id]);

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.title}>{stop.title.toUpperCase()}</Text>
        <Text style={styles.subtitle}>{stop.subtitle}</Text>
        <Text style={styles.meta}>{stop.meta}</Text>
      </View>

      <TouchableOpacity style={styles.add} activeOpacity={0.8} onPress={handleAdd}>
        <Text style={styles.addLabel}>{t("aiAdd")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export const RecommendedStopRow = memo(RecommendedStopRowComponent);
