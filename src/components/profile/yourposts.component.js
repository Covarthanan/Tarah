import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import {
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { PostGrid } from "../feed/postgrid.component";
import { SafeArea } from "../styles/safe.area.component";
import * as firebase from "firebase";

const APPNAME = "tarah";
let PATH = "";

export const YourPosts = ({ navigation, route }) => {
  const { userid } = route.params;
  const { postlist } = route.params;
  let postArr = [];

  console.log("postlist", postlist);

  const [postList, setPostList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //console.log("YourPosts", userid);

  const ReadUserProfile = (postid) => {
    let obj = {};
    PATH = `${APPNAME}/Feed/${postid}`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      obj = dtasnp.val();
      postArr.push(obj);
      // console.log("Feed Object ", obj);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (postlist && Object.keys(postlist).length > 0) {
      for (let index = 0; index < Object.keys(postlist).length; index++) {
        console.log("Post Id", Object.keys(postlist)[index]);
        ReadUserProfile(Object.keys(postlist)[index]);
      }
      console.log("postArr", postArr);

      setPostList(postArr);
    }
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
          <StyledEditProfile>Post🤩</StyledEditProfile>
        </SectionEditProfile>
        {!isLoading && postList.length > 0 ? (
          <PostGrid navigation={navigation} PostList={postList} from="post" />
        ) : (
          <Text
            style={{
              opacity: 0.5,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 300,
            }}
          >
            No post found😔
          </Text>
        )}
      </View>
    </SafeArea>
  );
};
