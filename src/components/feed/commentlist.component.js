import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import {
  LongPressGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import {
  GetUserName,
  RemoveComment,
} from "../../service/firebase/firebase.crud.service";
import { GetDateAndTime } from "../../service/IDGeneration/Id.generation.service";
import {
  Section,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import * as firebase from "firebase";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../common/toast.message.component";

const APPNAME = "tarah";
let PATH = "";

export const CommentInfo = ({ navigation, comment, postid, userid }) => {
  let datetime = GetDateAndTime(comment.datetime);

  // console.log(userid, comment.userid);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const [userName, setUserName] = useState("");
  const [commentid, setCommentid] = useState(comment.commentid);
  useEffect(() => {
    PATH = `${APPNAME}/Users/${comment.userid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      setUserName(dtasnp.val().username);
      setIsLoading(false);
    });
  }, [userName]);

  return (
    <View>
      <View
        style={{
          borderColor: "gray",
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          padding: 11,
        }}
      >
        <Section>
          {!isLoading ? (
            <Section style={{ marginLeft: -15 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("YourProfile", {
                    userid: comment.userid,
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFontFamily.seven,
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {userName}
                </Text>
              </TouchableOpacity>
              <SectionEnd style={{ marginRight: -15 }}>
                {userid === comment.userid && (
                  <IconButton
                    icon="dots-vertical"
                    size={15}
                    onPress={() => {
                      setIsDeleteModel(true);
                    }}
                  />
                )}
              </SectionEnd>
            </Section>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: CustomFontFamily.seven,
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                Loading..
              </Text>
              <View style={{ marginLeft: 4, marginTop: 2 }}>
                <ActivityIndicator size={16} color={CustomColors.primary} />
              </View>
            </View>
          )}
        </Section>
        <Section>
          <Text style={{ marginBottom: 5, marginLeft: -4 }}>
            {comment.comment}
          </Text>
        </Section>
        <SectionEnd>
          <Text style={{ fontSize: 12 }}>{datetime}</Text>
        </SectionEnd>
      </View>

      {/* Modal Delete */}
      <View>
        <Modal animationType="slide" transparent={true} visible={isDeleteModel}>
          <View
            style={[
              styles.centeredView,
              {
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() => {}}
          >
            <View style={styles.perviewModel}>
              <Text style={styles.modeltextStyle}>Delete this Comment?</Text>
              <Text
                style={{
                  color: "#bcb8b1",
                  fontSize: 12,
                  fontFamily: CustomFontFamily.six,
                  marginTop: 30,
                  textAlign: "center",
                }}
              >
                Do you really want to delete this Comment?
              </Text>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    AsyncStorage.getItem("userid").then((value) => {
                      if (value !== null) {
                        RemoveComment(comment.userid, postid, commentid);
                        setIsDeleteModel(false);
                        ToastMessage("Comment has successfully deleted.");
                      } else {
                        navigation.navigate("CreateProfile", {
                          from: "home",
                        });
                      }
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.modeltextStyle,
                      { color: "#01baef", paddingBottom: 10 },
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteModel(false);
                  }}
                >
                  <Text style={styles.modeltextStyle}>Don't delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export const CommentList = ({ navigation, postid, userid }) => {
  let commentlist = {};

  // console.log("CommentList", userid);
  const [commentList, setCommentList] = useState(commentlist);
  const [isListLoading, setIsListLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  // console.log(commentList);

  useEffect(() => {
    PATH = `${APPNAME}/Feed/${postid}/getCommentList/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      commentlist = dtasnp.val();
      if (commentlist) {
        var arr = [],
          keys = Object.keys(commentlist);
        for (var i = 0, n = keys.length; i < n; i++) {
          var key = keys[i];
          arr[i] = commentlist[key];
        }
        setCommentList(arr.reverse());
      }
      setIsListLoading(false);
    });
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  });

  return (
    <View>
      {!isListLoading ? (
        <FlatList
          nestedScrollEnabled={true}
          data={commentList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            return (
              <CommentInfo
                navigation={navigation}
                comment={item}
                postid={postid}
                userid={userid}
              />
            );
          }}
          keyExtractor={(item) => item.commentid}
        />
      ) : (
        <ActivityIndicator color={CustomColors.primary} size={50} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },

  modeltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
    margin: 5.2,
    marginLeft: 10,
    textAlign: "center",
  },
  perviewModel: {
    backgroundColor: "#242423",
    padding: 30,
    paddingTop: 10,
    elevation: 5,
    borderRadius: 10,
    height: 250,
    width: 250,
  },
});
