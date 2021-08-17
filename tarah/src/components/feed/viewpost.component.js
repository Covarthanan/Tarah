import React from "react";
import { View, Text, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { CardInfo } from "../card/cardinfo.component";
import {
  Section,
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { SafeArea } from "../styles/safe.area.component";
import { CustomColors } from "../styles/styles.component";
import { Theme } from "../styles/theme.reactnativepaper.component";

export const ViewPost = ({ navigation, route }) => {
  const { post } = route.params;
  const { from } = route.params;
  const { userid } = route.params;

  return (
    <SafeArea>
      <Section>
        <View style={{ marginLeft: -15 }}>
          <SectionEditProfile>
            <IconButton
              size={30}
              icon="arrow-left"
              onPress={() => {
                if (from === "post") {
                  navigation.navigate("YourPosts");
                } else if (from === "collection") {
                  navigation.navigate("YourCollections");
                }
              }}
            />
            <StyledEditProfile>View Post🤩</StyledEditProfile>
          </SectionEditProfile>
        </View>
        <SectionEnd>
          <IconButton
            size={30}
            icon="home-variant"
            color={CustomColors.primary}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </SectionEnd>
      </Section>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <CardInfo
          navigation={navigation}
          card_detail={post}
          from={from}
          userid={userid}
        />
      </ScrollView>
    </SafeArea>
  );
};
