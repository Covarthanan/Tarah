import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  Section,
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { TextInput, IconButton } from "react-native-paper";
import { CustomColors } from "../styles/styles.component";
import { Theme } from "../styles/theme.reactnativepaper.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../common/toast.message.component";
import { SafeArea } from "../styles/safe.area.component";
import { PostGrid } from "./postgrid.component";
import { CommentList } from "./commentlist.component";
import { CreateUserId } from "../../service/IDGeneration/Id.generation.service";
import { AddComment } from "../../service/firebase/firebase.crud.service";
import * as firebase from "firebase";

export const Comments = ({ navigation, route }) => {
  const { postid } = route.params;
  const { from } = route.params;
  const { postuserid } = route.params;

  // console.log("postid", postid);

  const [isloading, setIsloading] = useState(true);
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [comment, setComment] = useState("");

  AsyncStorage.getItem("username").then((value) => {
    if (value !== null) {
      setUsername(value);
    }
  });

  AsyncStorage.getItem("userid").then((value) => {
    if (value !== null) {
      setUserId(value);
    }
  });

  console.log("Comments", userid);

  return (
    <SafeArea>
      <View>
        <SectionEditProfile style={{ marginTop: -10, marginLeft: -7 }}>
          <IconButton
            size={30}
            icon="arrow-left"
            onPress={() => {
              if (from === "home") {
                navigation.navigate("Home");
              } else if (from === "post") {
                navigation.navigate("ViewPost");
              } else if (from === "collection") {
                navigation.navigate("ViewPost");
              }
            }}
          />
          <StyledEditProfile>Comments</StyledEditProfile>
        </SectionEditProfile>
        <View>
          <TextInput
            theme={Theme}
            multiline={true}
            mode="flat"
            style={{
              color: "red",
            }}
            value={comment}
            onChangeText={(comment) => {
              // console.log(comment);
              setComment(comment);
            }}
            placeholder={`Comment as ${username}...`}
            right={
              <TextInput.Icon
                name="send"
                onPress={() => {
                  if (comment.length) {
                    AsyncStorage.getItem("userid").then((value) => {
                      if (value !== null) {
                        let arrobj = {
                          userid: userid,
                          comment: comment.trim(),
                          datetime: Date.now(),
                          commentid: CreateUserId("comment"),
                          postuserid: postuserid,
                        };
                        AddComment(postid, arrobj);
                        setComment("");
                        console.log("Send Pressed");
                      } else {
                        navigation.navigate("CreateProfile", { from: "home" });
                      }
                    });
                  }
                }}
              />
            }
          />
        </View>
        <View style={{ marginBottom: 140 }}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <CommentList
              navigation={navigation}
              postid={postid}
              userid={userid}
            />
          </ScrollView>
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
