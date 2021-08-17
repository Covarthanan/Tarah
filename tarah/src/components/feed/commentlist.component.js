import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
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

      {/* Modal for Edit and Delete Option */}
      <View style={{ backgroundColor: "red" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModel}
          onRequestClose={() => {
            null;
          }}
          style={{ color: "blue" }}
        >
          <View
            style={styles.centeredViewEDModal}
            onPress={() => {
              console.log("Center View");
            }}
          >
            <Pressable
              onPress={() => {
                setIsDeleteModel(false);
                console.log("Pressed");
              }}
            >
              <View style={styles.perviewEDModal}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(postid);
                    RemoveComment(comment.userid, postid, commentid);
                    setIsDeleteModel(false);
                  }}
                >
                  <Text style={styles.modeltextStyleEDModal}>Delete</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export const CommentList = ({ navigation, postid, userid }) => {
  let commentlist = {};

  console.log("CommentList", userid);
  const [commentList, setCommentList] = useState(commentlist);
  const [isListLoading, setIsListLoading] = useState(true);

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

  return (
    <View>
      {!isListLoading ? (
        <FlatList
          nestedScrollEnabled={true}
          data={commentList}
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
  centeredViewEDModal: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  perviewEDModal: {
    backgroundColor: "#242423",
    padding: 30,
    elevation: 5,
    borderRadius: 15,
    marginTop: 637,
  },
  modeltextStyleEDModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
    margin: 5.2,
    marginLeft: 10,
  },
});
