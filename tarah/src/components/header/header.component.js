import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { CustomColors } from "../styles/styles.component";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppHeader = ({ navigation }) => {
  return (
    <Section>
      <IconButton
        size={38}
        color={CustomColors.primary}
        icon="account-outline"
        onPress={() => {
          AsyncStorage.getItem("userid").then((value) => {
            if (value !== null) {
              navigation.navigate("YourProfile", {
                from: "home",
                userid: value,

                
              });
            } else {
              navigation.navigate("CreateProfile", {
                from: "home",
              });
            }
          });
        }}
      />

      <View style={{ paddingLeft: 80 }}>
        <Image
          source={require("../../../assets/tarah/tarah.png")}
          style={{
            width: 90,
            height: 90,
          }}
          onPress={() => {
            console.log("Pressed");
            navigation.openDrawer();
          }}
        />
      </View>

      <SectionEnd>
        <IconButton
          size={34}
          color={CustomColors.primary}
          icon="plus-circle-outline"
          onPress={() => {
            AsyncStorage.getItem("userid").then((value) => {
              if (value !== null) {
                navigation.navigate("AddPost", { from: "home" });
              } else {
                navigation.navigate("CreateProfile", {
                  from: "home",
                });
              }
            });
          }}
        />
      </SectionEnd>
      <StatusBar style="auto" />
    </Section>
  );
};

const Section = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  background-color: white;
  margin-bottom: 8px;
  padding-top: 20px;
  top: 3px;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
