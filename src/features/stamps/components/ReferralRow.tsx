import { memo } from "react";
import { Text, View } from "react-native";

import type { ReferralEntry } from "@/features/stamps/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ReferralRow.styles";

type Props = {
  entry: ReferralEntry;
};

function ReferralRowComponent({ entry }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const completed = entry.status === "completed";

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{entry.name}</Text>
        <Text style={[styles.status, completed ? styles.completed : styles.pending]}>
          {t(completed ? "referralCompleted" : "referralPending")}
        </Text>
      </View>
      <Text style={styles.amount}>{entry.amount ?? "--"}</Text>
    </View>
  );
}

export const ReferralRow = memo(ReferralRowComponent);
