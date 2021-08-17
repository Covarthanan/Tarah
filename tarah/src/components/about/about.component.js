import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { IconButton } from "react-native-paper";
import {
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { SafeArea } from "../styles/safe.area.component";
import { CustomFontFamily } from "../styles/styles.component";

export const About = ({ navigation }) => {
  return (
    <SafeArea>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <SectionEditProfile>
          <IconButton
            size={30}
            icon="close"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <StyledEditProfile>App Info</StyledEditProfile>
        </SectionEditProfile>
        <View
          style={{
            marginTop: 160,
            marginBottom: 400,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              textAlign: "center",
              margin: 10,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 20,
              fontFamily: CustomFontFamily.six,
            }}
          >
            Tarah is a free, online poem sharing application and social network
            platfrom.
          </Text>
          <Text
            style={{
              fontFamily: CustomFontFamily.second,
              fontSize: 60,
              justifyContent: "center",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Welcome to Tarah🥰!
          </Text>

          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              textAlign: "center",
              fontSize: 15,
              margin: 10,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
              fontFamily: CustomFontFamily.seven,
            }}
          >
            The Tarah Service is one of the Summa Pannuvom Products, provided to
            you by Summa Pannuvom😎
          </Text>

          {/* <Image
            style={{ height: 80, width: 80 }}
            source={require("../../../assets/tarah/Tarah_1024.png")}
          /> */}
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  spacing: {
    padding: 10,
    paddingBottom: 2,
    paddingTop: 0,
  },
});
