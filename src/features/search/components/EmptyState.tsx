import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./EmptyState.styles";

type Props = {
  message: string;
};

export function EmptyState({ message }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
