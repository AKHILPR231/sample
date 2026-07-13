import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type {
  ChatMessage,
  ChipState,
  FlowOption,
} from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { AiAvatar } from "./AiAvatar";
import { AiChip } from "./AiChip";
import { createStyles } from "./OptionsBlock.styles";

type OptionsMessage = Extract<ChatMessage, { kind: "options" }>;

type Props = {
  message: OptionsMessage;
  onSingle: (messageId: string, option: FlowOption) => void;
  onToggle: (messageId: string, optionId: string) => void;
  onSubmit: (messageId: string) => void;
  onAction: (messageId: string, option: FlowOption) => void;
};

export function OptionsBlock({
  message,
  onSingle,
  onToggle,
  onSubmit,
  onAction,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const { id, mode, options, selected, answered } = message;

  const handleSubmit = useCallback(() => onSubmit(id), [onSubmit, id]);

  if (mode === "action") {
    const option = options[0];
    return (
      <View style={styles.row}>
        <AiAvatar muted={answered} />
        <TouchableOpacity
          style={[styles.actionButton, answered ? styles.actionMuted : null]}
          activeOpacity={0.7}
          disabled={answered}
          onPress={() => onAction(id, option)}
        >
          <Text
            style={[styles.actionLabel, answered ? styles.actionLabelMuted : null]}
          >
            {t(option.labelKey)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <AiAvatar muted={answered} />
      <View style={styles.chips}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          let state: ChipState = "default";
          if (answered) state = "muted";
          else if (mode === "multi" && isSelected) state = "selected";

          return (
            <AiChip
              key={option.id}
              label={t(option.labelKey)}
              state={state}
              showRemove={mode === "multi" && isSelected && !answered}
              onPress={
                answered
                  ? undefined
                  : () =>
                      mode === "single"
                        ? onSingle(id, option)
                        : onToggle(id, option.id)
              }
            />
          );
        })}

        {mode === "multi" && !answered && selected.length > 0 ? (
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.7}
            onPress={handleSubmit}
          >
            <Text style={styles.submitLabel}>{t("aiSubmit")}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
