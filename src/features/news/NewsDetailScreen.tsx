import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { SectionCard } from "@/features/services/components/SectionCard/SectionCard";
import { useNewsArticle, useRelatedNews } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";

import { EmptyState } from "./components/EmptyState/EmptyState";
import { NewsCategoryChip } from "./components/NewsCategoryChip/NewsCategoryChip";
import { NewsHeader } from "./components/NewsHeader/NewsHeader";
import { NewsImage } from "./components/NewsImage/NewsImage";
import { RelatedNewsRow } from "./components/RelatedNewsRow/RelatedNewsRow";
import { DETAIL_COPY } from "./constants";
import { getCategoryMeta } from "./newsMeta";
import { createStyles } from "./NewsDetailScreen.styles";
import type { NewsArticle } from "./types";
import { formatDate, formatTime } from "./utils";

type Props = { uid: string };

/**
 * Outer screen: resolves the article (event) by uid and handles loading /
 * not-found. Content is delegated to an inner component that mounts only once
 * a concrete article exists, so the related-articles RxDB subscription is
 * scoped to a known `type` (matching the single-subscription hook pattern).
 */
export function NewsDetailScreen({ uid }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { data: article, loading } = useNewsArticle(uid);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <NewsHeader title={DETAIL_COPY.headerTitle} onBack={handleBack} />
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.screen}>
        <NewsHeader title={DETAIL_COPY.headerTitle} onBack={handleBack} />
        <View style={styles.centered}>
          <EmptyState
            icon="newspaper-remove"
            title={DETAIL_COPY.notFoundTitle}
          />
        </View>
      </View>
    );
  }

  return (
    <NewsDetailContent article={article as NewsArticle} onBack={handleBack} />
  );
}

function NewsDetailContent({
  article,
  onBack,
}: {
  article: NewsArticle;
  onBack: () => void;
}) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const meta = useMemo(() => getCategoryMeta(article.type), [article.type]);
  const { data: related } = useRelatedNews(article.uid, article.type);
  const relatedList = (related ?? []) as NewsArticle[];

  const summary = article.short_description ?? DETAIL_COPY.summaryFallback;

  const handleShare = useCallback(() => {
    const dateLine = formatDate(article.start_datetime);
    Share.share({
      title: article.title,
      message: `${article.title}${dateLine ? ` — ${dateLine}` : ""}\n${summary}`,
    }).catch(() => undefined);
  }, [article.title, article.start_datetime, summary]);

  const handleAddToCalendar = useCallback(() => {
    const start = toCalendarStamp(article.start_datetime);
    const end = toCalendarStamp(article.end_datetime ?? article.start_datetime);
    const q = [
      "action=TEMPLATE",
      `text=${encodeURIComponent(article.title)}`,
      `dates=${start}/${end}`,
      `details=${encodeURIComponent(summary)}`,
      `location=${encodeURIComponent(article.venue_outlet_name ?? "")}`,
    ].join("&");
    const url = `https://calendar.google.com/calendar/render?${q}`;
    Linking.openURL(url).catch(() => undefined);
  }, [article, summary]);

  const handleOpenRelated = useCallback((next: NewsArticle) => {
    router.push(`/news/${next.uid}`);
  }, []);

  const hasDetails =
    Boolean(article.type) ||
    Boolean(article.venue_outlet_name) ||
    Boolean(article.location_in_outlet);

  return (
    <View style={styles.screen}>
      <NewsHeader
        title={DETAIL_COPY.headerTitle}
        onBack={onBack}
        onShare={handleShare}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NewsImage uri={article.image_url} height={280} />

        {/* Event info */}
        <View style={styles.infoBlock}>
          <View style={styles.chipRow}>
            <NewsCategoryChip type={article.type} />
          </View>
          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.dateBox}>
            <View style={styles.dateCol}>
              <Text style={styles.dateLabel}>{DETAIL_COPY.startsLabel}</Text>
              <Text style={styles.dateValue}>
                {formatDate(article.start_datetime)}
              </Text>
              <Text style={styles.dateTime}>
                {formatTime(article.start_datetime)}
              </Text>
            </View>
            {article.end_datetime ? (
              <View style={styles.dateCol}>
                <Text style={styles.dateLabel}>{DETAIL_COPY.endsLabel}</Text>
                <Text style={styles.dateValue}>
                  {formatDate(article.end_datetime)}
                </Text>
                <Text style={styles.dateTime}>
                  {formatTime(article.end_datetime)}
                </Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.cta}
            onPress={handleAddToCalendar}
            accessibilityRole="button"
            accessibilityLabel={`${DETAIL_COPY.addToCalendar}: ${article.title}`}
          >
            <MaterialCommunityIcons
              name="calendar-plus"
              size={18}
              color={theme.colors.background}
            />
            <Text style={styles.ctaLabel}>{DETAIL_COPY.addToCalendar}</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.sectionWrap}>
          <SectionCard title={DETAIL_COPY.aboutTitle} icon="text-box-outline">
            <Text style={styles.bodyText}>{summary}</Text>
          </SectionCard>

          {hasDetails ? (
            <SectionCard
              title={DETAIL_COPY.detailsTitle}
              icon="information-outline"
            >
              <DetailRow
                label={DETAIL_COPY.categoryLabel}
                value={meta.label}
              />
              {article.venue_outlet_name ? (
                <DetailRow
                  label={DETAIL_COPY.venueLabel}
                  value={article.venue_outlet_name}
                  last={!article.location_in_outlet}
                />
              ) : null}
              {article.location_in_outlet ? (
                <DetailRow
                  label={DETAIL_COPY.whereLabel}
                  value={article.location_in_outlet}
                  last
                />
              ) : null}
            </SectionCard>
          ) : null}

          {relatedList.length > 0 ? (
            <SectionCard
              title={DETAIL_COPY.relatedTitle}
              icon="calendar-multiple"
            >
              {relatedList.map((item, idx) => (
                <RelatedNewsRow
                  key={item.uid}
                  article={item}
                  onPress={handleOpenRelated}
                  last={idx === relatedList.length - 1}
                />
              ))}
            </SectionCard>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

function DetailRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.detailRow, last && styles.detailRowLast]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

/** ISO → Google Calendar UTC stamp (YYYYMMDDTHHmmssZ). */
function toCalendarStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
