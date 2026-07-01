import { Text } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./SectionHeader.styles";

type Props = {
  title: string;
};

export function SectionHeader({ title }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return <Text style={styles.title}>{title}</Text>;
}
