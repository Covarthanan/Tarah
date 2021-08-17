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

export const YourFollowers = ({ navigation, route }) => {
  const [followerList, setFollowerList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { userid } = route.params;

  console.log(userid);

  const ReadUserProfile = (userid) => {
    let obj = {};
    PATH = `${APPNAME}/Users/${userid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      obj = dtasnp.val();
      // console.log(dtasnp.val());
      if (obj.getFollowerList) {
        setFollowerList(obj.getFollowerList);
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
          <StyledEditProfile>Followers</StyledEditProfile>
        </SectionEditProfile>
        {!isLoading && followerList ? (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            <FollowList
              navigation={navigation}
              List={followerList}
              from="post"
            />
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
            No followers found😔
          </Text>
        )}
      </View>
    </SafeArea>
  );
};
