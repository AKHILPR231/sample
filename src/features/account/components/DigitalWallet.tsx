import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./DigitalWallet.styles";

type Props = {
  onApple: () => void;
  onGoogle: () => void;
};

export function DigitalWallet({ onApple, onGoogle }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("digitalWalletHeader")}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.wallet}
          activeOpacity={0.85}
          onPress={onApple}
        >
          <Ionicons
            name="logo-apple"
            size={rf(24)}
            color={theme.colors.viaWhite}
          />
          <View style={styles.walletText}>
            <Text style={styles.walletTop}>{t("addTo")}</Text>
            <Text style={styles.walletName}>{t("appleWallet")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wallet}
          activeOpacity={0.85}
          onPress={onGoogle}
        >
          <Ionicons
            name="logo-google"
            size={rf(24)}
            color={theme.colors.viaWhite}
          />
          <View style={styles.walletText}>
            <Text style={styles.walletTop}>{t("addTo")}</Text>
            <Text style={styles.walletName}>{t("googleWallet")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
