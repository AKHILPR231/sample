import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { createStyles } from "./TimelineRow.styles";

type Props = {
  time: string;
  boundary?: "start" | "end";
  isLast?: boolean;
  children: ReactNode;
};

export function TimelineRow({ time, boundary, isLast, children }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const prefix =
    boundary === "start"
      ? t("aiStart")
      : boundary === "end"
        ? t("aiEnd")
        : null;

  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!isLast ? <View style={styles.line} /> : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.time}>
          {prefix ? `${prefix} | ${time}` : time}
        </Text>
        {children}
      </View>
    </View>
  );
}
