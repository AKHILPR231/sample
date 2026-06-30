import { useState } from "react";
import { Image, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./ProfileAvatar.styles";

type Props = {
  uri?: string;
  initials: string;
};

export function ProfileAvatar({ uri, initials }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [failed, setFailed] = useState(false);

  const showImage = !!uri && !failed;

  return (
    <View style={styles.ring}>
      {showImage ? (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
    </View>
  );
}
