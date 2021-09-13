import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import {
  SectionEditProfile,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { SafeArea } from "../styles/safe.area.component";
import { FollowList } from "./followlist.component";
import * as firebase from "firebase";

const APPNAME = "tarah";
let PATH = "";

export const YourFollowings = ({ navigation, route }) => {
  const [followingList, setFollowingList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { userid } = route.params;

  const ReadUserProfile = (userid) => {
    let obj = {};
    PATH = `${APPNAME}/Users/${userid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      obj = dtasnp.val();
      if (obj.getFollowingList) {
        setFollowingList(obj.getFollowingList);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    ReadUserProfile(userid);
  }, []);

  return (
    <SafeArea>
      <View>
        <SectionEditProfile>
          <IconButton
            size={30}
            icon="arrow-left"
            onPress={() => {
              navigation.navigate("YourProfile");
            }}
          />
          <StyledEditProfile>Following</StyledEditProfile>
        </SectionEditProfile>
        {!isLoading && followingList ? (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <FollowList navigation={navigation} List={followingList} />
          </ScrollView>
        ) : (
          <Text
            style={{
              opacity: 0.5,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 300,
            }}
          >
            No following found😔
          </Text>
        )}
      </View>
    </SafeArea>
  );
};
