import React from "react";
import styled from "styled-components/native";

export const WelcomeBackgroundImage = styled.ImageBackground.attrs({
  source: require("../../../assets/tarah/tarah.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
`;

export const CustomColors = {
  primary: "#C50909",
  bgcolor: "white",
  tertiary: "",
};

export const CustomSize = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 60, 64,
  128,
];

export const CustomFontFamily = {
  first: "Andika_400Regular",
  second: "FredokaOne_400Regular",
  third: "CarterOne_400Regular",
  fouth: "SecularOne_400Regular",
  fifth: "AlikeAngular_400Regular",
  six: "Sen_400Regular",
  seven: "Sen_700Bold",
  eight: "Sen_800ExtraBold",
  nine: "Pacifico_400Regular",
  ten: "Satisfy_400Regular",
  text11: "KaushanScript_400Regular",
  text12: "Sacramento_400Regular",
  text13: "GloriaHallelujah_400Regular",
  text14: "Cookie_400Regular",
  text15: "LilitaOne_400Regular",
  text16: "Aclonica_400Regular",
  text17: "Knewave_400Regular",
};
