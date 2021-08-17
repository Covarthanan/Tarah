import React, { useRef } from "react";
import { ActivityIndicator, View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CustomColors } from "../styles/styles.component";
import LottieView from "lottie-react-native";

export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/tarah/tarah.png")}
      />
      <StatusBar style="auto" />
      <View style={styles.indicator}>
        <ActivityIndicator size={70} color={CustomColors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 280,
    alignItems: "center",
  },
  image: {
    width: 160,
    height: 160,
  },
  indicator: {
    paddingTop: 230,
  },
});
