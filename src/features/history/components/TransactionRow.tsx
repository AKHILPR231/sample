import { memo } from "react";
import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { TransactionView } from "@/features/history/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./TransactionRow.styles";

type Props = {
  txn: TransactionView;
};

function TransactionRowComponent({ txn }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name={txn.icon} size={rf(20)} color={theme.colors.viaNavy} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {txn.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {txn.subtitle}
        </Text>
      </View>
      <Text
        style={[styles.amount, txn.credit ? styles.credit : styles.debit]}
      >
        {txn.amountLabel}
      </Text>
    </View>
  );
}

export const TransactionRow = memo(TransactionRowComponent);
