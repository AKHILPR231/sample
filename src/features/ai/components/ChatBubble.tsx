import { memo } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./ChatBubble.styles";

type Props = {
  text: string;
  variant: "ai" | "user";
};

function ChatBubbleComponent({ text, variant }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const isUser = variant === "user";

  return (
    <View style={isUser ? styles.rowRight : styles.rowLeft}>
      <View style={isUser ? styles.userBubble : styles.aiBubble}>
        <Text style={isUser ? styles.userText : styles.aiText}>{text}</Text>
      </View>
    </View>
  );
}

export const ChatBubble = memo(ChatBubbleComponent);
