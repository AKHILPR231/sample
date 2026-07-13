import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { PlanStop } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./TimelineStopCard.styles";

type Props = {
  stop: PlanStop;
  onToggleDone: (id: string) => void;
  onNavigate: (id: string) => void;
};

function TimelineStopCardComponent({ stop, onToggleDone, onNavigate }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handleDone = useCallback(() => onToggleDone(stop.id), [onToggleDone, stop.id]);
  const handleNavigate = useCallback(() => onNavigate(stop.id), [onNavigate, stop.id]);

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <View style={styles.logoWrap}>
          {stop.logo ? (
            <Image source={stop.logo} style={styles.logo} resizeMode="contain" />
          ) : (
            <Ionicons
              name={stop.icon}
              size={rf(20)}
              color={theme.colors.viaWhite}
            />
          )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.title, stop.done ? styles.done : null]} numberOfLines={1}>
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
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          activeOpacity={0.7}
          onPress={handleDone}
        >
          <Text style={[styles.actionLabel, stop.done ? styles.actionActive : null]}>
            {t(stop.done ? "aiDone" : "aiMarkAsDone")}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.action}
          activeOpacity={0.7}
          onPress={handleNavigate}
        >
          <Text style={styles.actionLabel}>{t("aiNavigate")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const TimelineStopCard = memo(TimelineStopCardComponent);
