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

export const YourCollections = ({ navigation, route }) => {
  const { userid } = route.params;
  const { collectionlist } = route.params;
  let postArr = [];

  const [collectionList, setCollectionList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const ReadUserProfile = (postid) => {
    let obj = {};
    PATH = `${APPNAME}/Feed/${postid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      obj = dtasnp.val();
      postArr.push(obj);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (collectionlist && Object.keys(collectionlist).length > 0) {
      for (let index = 0; index < Object.keys(collectionlist).length; index++) {
        console.log("Post Id", Object.keys(collectionlist)[index]);
        ReadUserProfile(Object.keys(collectionlist)[index]);
      }
      console.log("postArr", postArr);
      setCollectionList(postArr);
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
          <StyledEditProfile>Collections🤩</StyledEditProfile>
        </SectionEditProfile>
        {!isLoading ? (
          <PostGrid
            navigation={navigation}
            PostList={collectionList}
            from="collection"
          />
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
