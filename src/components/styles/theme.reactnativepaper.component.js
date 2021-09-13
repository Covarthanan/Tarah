import { DefaultTheme } from "react-native-paper";
import { CustomFontFamily, CustomSize } from "../styles/styles.component";
import { CustomColors } from "../styles/styles.component";

export const Theme = {
  ...DefaultTheme,
  roundness: 2,
  mode: "adaptive",
  fonts: { medium: CustomFontFamily.first },
  colors: {
    ...DefaultTheme.colors,
    primary: CustomColors.primary,
    accent: CustomColors.primary,
    placeholder: "black",
    // background: CustomColors.bgcolor,
    surface: "green",
    text: "black",
    onSurface: "red",
    notification: "red",
  },
};
