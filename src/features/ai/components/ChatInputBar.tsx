import { TextInput, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ChatInputBar.styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export function ChatInputBar({ value, onChangeText, onSubmit }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={t("aiInputPlaceholder")}
        placeholderTextColor={theme.colors.textgray}
        returnKeyType="send"
      />
      <TouchableOpacity activeOpacity={0.7} onPress={onSubmit}>
        <Ionicons name="mic-outline" size={rf(20)} color={theme.colors.textgray} />
      </TouchableOpacity>
    </View>
  );
}
