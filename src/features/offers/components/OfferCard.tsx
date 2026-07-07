import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { Offer } from "@/features/offers/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./OfferCard.styles";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parseDate = (iso?: string): { month: string; day: number } | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return { month: MONTHS[date.getUTCMonth()], day: date.getUTCDate() };
};

type Props = {
  offer: Offer;
  width: number;
  onPress: (id: string) => void;
};

function OfferCardComponent({ offer, width, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handlePress = useCallback(() => onPress(offer.id), [onPress, offer.id]);

  const from = parseDate(offer.validFrom);
  const to = parseDate(offer.validUntil);
  const validity =
    from && to
      ? t("offerValidFromTo", {
          from: `${from.month} ${from.day}`,
          to: from.month === to.month ? `${to.day}` : `${to.month} ${to.day}`,
        })
      : null;

  const hasPrice = !!offer.priceOld && !!offer.priceNow;

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <View style={styles.imageWrap}>
        {offer.imageUrl ? (
          <Image
            source={{ uri: offer.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]} />
        )}

        <View style={styles.ribbon}>
          <Text style={styles.ribbonText} numberOfLines={1}>
            {t("offerCampaign")}
          </Text>
        </View>

        <Ionicons
          name="bookmark-outline"
          size={rf(18)}
          color={theme.colors.viaWhite}
          style={styles.bookmark}
        />

        {offer.tier ? (
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>
              {t(`tier${offer.tier.charAt(0).toUpperCase()}${offer.tier.slice(1)}`)}
            </Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {offer.title.toUpperCase()}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {offer.description}
      </Text>

      {hasPrice ? (
        <>
          <Text style={styles.priceOld}>
            {t("offerInsteadOf", { price: offer.priceOld })}
          </Text>
          <Text style={styles.priceNow}>
            {t("offerNow", { price: offer.priceNow })}
          </Text>
        </>
      ) : null}

      {validity ? <Text style={styles.validity}>{validity}</Text> : null}
    </TouchableOpacity>
  );
}

export const OfferCard = memo(OfferCardComponent);
