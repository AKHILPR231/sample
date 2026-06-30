export const palette = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  gray100: "#F5F5F5",
  gray300: "#CCCCCC",
  gray600: "#666666",
  gray900: "#1A1A1A",
  brand: "#E85D26", // your primary brand color — update to match Via Outlets
  brandLight: "#FFF0EA",
};

export const lightColors = {
  background: palette.white,
  surface: palette.gray100,
  text: palette.gray900,
  textSecondary: palette.gray600,
  border: palette.gray300,
  primary: palette.brand,
  primarySubtle: palette.brandLight,
};

export const darkColors: typeof lightColors = {
  background: palette.black,
  surface: palette.gray900,
  text: palette.white,
  textSecondary: palette.gray300,
  border: palette.gray600,
  primary: palette.brand,
  primarySubtle: palette.gray900,
};
