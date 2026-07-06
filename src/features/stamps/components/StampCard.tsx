import { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { StampCard as StampCardModel } from "@/features/stamps/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";

import { createStyles } from "./StampCard.styles";

type Props = {
  card: StampCardModel;
  expanded: boolean;
  onToggle: (id: string) => void;
  onRedeem: (id: string) => void;
};

function StampCardComponent({ card, expanded, onToggle, onRedeem }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handleToggle = useCallback(() => onToggle(card.id), [onToggle, card.id]);
  const handleRedeem = useCallback(() => onRedeem(card.id), [onRedeem, card.id]);

  const remaining = Math.max(0, card.total - card.collected);
  const stamps = Array.from({ length: card.total });

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.headerRow}
        activeOpacity={0.85}
        onPress={handleToggle}
      >
        <View style={styles.iconWrap}>
          <Ionicons name={card.icon} size={rf(18)} color={theme.colors.viaNavy} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {card.title.toUpperCase()}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {expanded
              ? card.subtitle
              : t("stampCount", { collected: card.collected, total: card.total })}
          </Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-down" : "chevron-forward"}
          size={rf(18)}
          color={theme.colors.textgray}
        />
      </TouchableOpacity>

      {expanded ? (
        <Animated.View entering={FadeInDown.duration(200)} style={styles.body}>
          <View style={styles.grid}>
            {stamps.map((_, index) => {
              const filled = index < card.collected;
              return (
                <View
                  key={index}
                  style={[
                    styles.stamp,
                    filled ? styles.stampFilled : styles.stampEmpty,
                  ]}
                >
                  {filled ? (
                    <Ionicons
                      name="ribbon"
                      size={rf(20)}
                      color={theme.colors.viaWhite}
                    />
                  ) : (
                    <Text style={styles.stampNumber}>{index + 1}</Text>
                  )}
                </View>
              );
            })}
          </View>

          <Text style={styles.progress}>
            {t("stampProgress", {
              collected: card.collected,
              total: card.total,
              remaining,
            })}
          </Text>

          <TouchableOpacity
            style={styles.redeem}
            activeOpacity={0.85}
            onPress={handleRedeem}
          >
            <Text style={styles.redeemLabel}>{t("redeem")}</Text>
          </TouchableOpacity>

          {card.validUntil ? (
            <Text style={styles.valid}>
              {t("stampValidUntil", { date: card.validUntil })}
            </Text>
          ) : null}
        </Animated.View>
      ) : null}
    </View>
  );
}

export const StampCard = memo(StampCardComponent);
