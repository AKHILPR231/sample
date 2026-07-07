import { memo, useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { HelpFaq } from "@/features/help/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./HelpLinkRow.styles";

type Props = {
  faq: HelpFaq;
  onPress: (id: string) => void;
};

function HelpLinkRowComponent({ faq, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handlePress = useCallback(() => onPress(faq.id), [onPress, faq.id]);

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handlePress}>
      <Text style={styles.text}>{t(faq.questionKey)}</Text>
      <Ionicons
        name="chevron-forward"
        size={rf(18)}
        color={theme.colors.textgray}
      />
    </TouchableOpacity>
  );
}

export const HelpLinkRow = memo(HelpLinkRowComponent);
