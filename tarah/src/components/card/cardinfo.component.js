import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

import {
  StyledCard,
  StyledCardComments,
  StyledCardLikes,
  StyledCardTitle,
  StyledCardDateTime,
  Section,
  SectionEnd,
  SectionEditProfile,
  StyledEditProfile,
} from "./cardstyle.component";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import { IconButton, TextInput } from "react-native-paper";
import LottieView from "lottie-react-native";
import { EditDeleteModel } from "./edit.delete.model.component";
import { ToastMessage } from "../common/toast.message.component";
import { SharePost } from "../feed/sharepost.component";
import {
  CreateUserId,
  GetDateAndTime,
} from "../../service/IDGeneration/Id.generation.service";
import {
  AddComment,
  AddPostAndCollectionListToUser,
  GetShareInfo,
  GetUserName,
  RemovePostAndCollectionToUser,
  UpdateLikesCount,
} from "../../service/firebase/firebase.crud.service";
import * as firebase from "firebase";
import { Theme } from "../styles/theme.reactnativepaper.component";
import { StatusBar } from "expo-status-bar";
import { CommentList } from "../feed/commentlist.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APPNAME = "tarah";
let PATH = "";

export const CardInfo = ({ navigation, card_detail = {}, from, userid }) => {
  // console.log("Card info", card_detail);

  // console.log(card_detail.getCommentList);

  console.log(from);

  let username = "";
  //let userid = "";
  AsyncStorage.getItem("username").then((value) => {
    if (value !== null) {
      username = value;
    }
  });
  // AsyncStorage.getItem("userid").then((value) => {
  //   if (value !== null) {
  //     userid = value;
  //   }
  // });

  const [author, setAuthor] = useState(card_detail.getAuthor);
  const [bgColor, setBgColor] = useState(card_detail.getBgColor);
  const [caption, setCaption] = useState(card_detail.getCaption);
  const [datetime, setDateTime] = useState(
    GetDateAndTime(card_detail.getDateTime)
  );
  const [poem, setPoem] = useState(card_detail.getPoem);
  const [textAlign, setTextAlign] = useState(card_detail.getTextAlign);
  const [textColor, setTextColor] = useState(card_detail.getTextColor);
  const [textFont, setTextFont] = useState(card_detail.getTextFont);
  const [textSize, setTextSize] = useState(card_detail.getTextSize);
  const [title, setTitle] = useState(card_detail.getTitle);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");

  const [likesCount, setlikesCount] = useState(card_detail.getLikesCount);
  // const [commentList, setCommentList] = useState(card_detail.getCommentList);
  const [collectionList, setCollectionList] = useState(
    card_detail.getCollectionList
  );

  const [isEDModel, setIsEDModel] = useState(false);
  const [isCommentModel, setIsCommentModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [isTagOutline, setIsTagOutline] = useState(true);
  const [isDoubleTap, setIsDoubleTap] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profile_URI, setProfile_URI] = useState();

  //let isDoubleTap = false;

  const animation = useRef(null);
  const isFirstRun = useRef(true);

  const doubleTapAnimation = useRef(null);
  const doubleTapFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(150, 150);
      } else {
        animation.current.play(33, 33);
      }
      isFirstRun.current = false;
    } else if (isLiked) {
      animation.current.play(36, 120);
    } else {
      animation.current.play(0, 30);
    }

    //DoubleTap
    if (doubleTapFirstRun.current) {
      if (isLiked) {
        doubleTapAnimation.current.play(0, 0);
      } else {
        doubleTapAnimation.current.play(0, 0);
      }
      doubleTapFirstRun.current = false;
    } else if (isLiked) {
      doubleTapAnimation.current.play(8, 44);
    } else {
      doubleTapAnimation.current.play(0, 0);
    }
  }, [isLiked]);

  //Double Tab
  let lastTap = null;
  const DoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      // console.log("Double Clicked");
      //setIsDoubleTap(true);
      setlikesCount(likesCount + 1);
      UpdateLikesCount(card_detail.postid, likesCount + 1);
      setIsLiked(true);
      if (isLiked) {
        doubleTapAnimation.current.play(10, 44);
      }
    } else {
      lastTap = now;
    }
  };

  //Loading User Profile
  useEffect(() => {
    PATH = `${APPNAME}/Users/${card_detail.userid}`;
    const ref = firebase.storage().ref(PATH);
    ref
      .getDownloadURL()
      .then((url) => {
        setProfile_URI(url);
        setIsProfileLoading(false);
      })
      .catch((e) => {
        // console.log("URL ila", e);
      });
  });

  return (
    <View>
      {/* <Text>{card_detail.title}</Text> */}
      <StyledCard elevation={5}>
        <Section style={{ marginTop: 0 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourProfile", {
                userid: card_detail.userid,
                username: card_detail.username,
              });
            }}
          >
            {!isProfileLoading ? (
              <Image
                source={{ uri: profile_URI }}
                style={styles.profileImage}
                onPress={() => {
                  null;
                }}
              />
            ) : (
              <ActivityIndicator color={CustomColors.primary} size={40} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourProfile", {
                userid: card_detail.userid,
                username: card_detail.username,
              });
            }}
          >
            <StyledCardTitle style={{ paddingLeft: 10 }}>
              {card_detail.getUserName}
            </StyledCardTitle>
          </TouchableOpacity>

          {userid === card_detail.userid && (
            <SectionEnd>
              <IconButton
                icon="dots-vertical"
                size={30}
                color={CustomColors.primary}
                backgroundColor={CustomColors.bgcolor}
                onPress={() => {
                  setIsEDModel(true);
                  console.log("Pressed");
                }}
              />
            </SectionEnd>
          )}
        </Section>

        {caption.length > 0 ? (
          <Text style={{ padding: 10, paddingLeft: 15, paddingRight: 15 }}>
            {caption}
          </Text>
        ) : (
          <Text> </Text>
        )}

        <View style={styles.poemLayout(bgColor)}>
          <TouchableWithoutFeedback
            onPress={() => {
              DoubleTap();
            }}
          >
            <View>
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <LottieView
                  ref={doubleTapAnimation}
                  style={{ width: 50, height: 400 }}
                  source={require("../../../assets/tarah/fireworks.json")}
                  autoPlay={false}
                  loop={false}
                />
              </View>

              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                <Text
                  style={[
                    styles.textTitle,
                    styles.textStyle(
                      textAlign,
                      textColor,
                      textFont,
                      textSize + 10
                    ),
                  ]}
                >
                  {title}
                </Text>

                <Text
                  style={[
                    styles.textPoem,
                    styles.textStyle(textAlign, textColor, textFont, textSize),
                  ]}
                >
                  {poem}
                </Text>

                <Text
                  style={[
                    styles.textAuthor,
                    styles.textStyle(
                      textAlign,
                      textColor,
                      textFont,
                      textSize + 5
                    ),
                  ]}
                >
                  @{author}
                </Text>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ marginBottom: -13 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingTop: 0 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsLiked(!isLiked);
                  if (!isLiked) {
                    let like = likesCount + 1;
                    setlikesCount(like);
                    UpdateLikesCount(card_detail.postid, likesCount + 1);
                  } else {
                    if (likesCount !== 0 || likesCount > 0) {
                      setlikesCount(likesCount - 1);
                      UpdateLikesCount(card_detail.postid, likesCount - 1);
                    }
                  }
                }}
              >
                <LottieView
                  ref={animation}
                  style={{ width: 70, height: 70 }}
                  source={require("../../../assets/tarah/heart.json")}
                  autoPlay={false}
                  loop={false}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 6 }}>
              <IconButton
                icon="comment-text-outline"
                size={30}
                color={CustomColors.primary}
                backgroundColor="black"
                onPress={() => {
                  navigation.navigate("Comments", {
                    commentlist: card_detail.getCommentList,
                    postid: card_detail.postid,
                    from: from,
                    postuserid: card_detail.userid,
                  });
                }}
              />
            </View>

            <View style={{ marginTop: 6 }}>
              <IconButton
                icon="share-variant"
                size={30}
                color={CustomColors.primary}
                backgroundColor={CustomColors.bgcolor}
                onPress={() => {
                  let info = "Thanks for using Tarah!";
                  //info = GetShareInfo();
                  // setTimeout(() => {
                  SharePost(title, poem, author, info);
                  //  }, 100);
                  //console.log("Pressed");
                }}
              />
            </View>

            <SectionEnd style={{ marginTop: 6 }}>
              {isTagOutline && (
                <IconButton
                  icon="tag-outline"
                  size={30}
                  color={CustomColors.primary}
                  backgroundColor={CustomColors.bgcolor}
                  onPress={() => {
                    AsyncStorage.getItem("userid").then((value) => {
                      if (value !== null) {
                        setIsTagOutline(false);
                        AddPostAndCollectionListToUser(
                          "collection",
                          card_detail
                        );
                        ToastMessage("Post saved to your collection.");
                        console.log("Pressed");
                      } else {
                        navigation.navigate("CreateProfile", {
                          from: "home",
                        });
                      }
                    });
                  }}
                />
              )}
              {!isTagOutline && (
                <IconButton
                  icon="tag"
                  size={30}
                  color={CustomColors.primary}
                  backgroundColor={CustomColors.bgcolor}
                  onPress={() => {
                    setIsTagOutline(true);
                    RemovePostAndCollectionToUser(
                      "collection",
                      card_detail.userid,
                      card_detail.postid
                    );
                    ToastMessage("Post removed from your collection.");
                    console.log("Pressed");
                  }}
                />
              )}
            </SectionEnd>
          </View>
        </View>

        <Section>
          {likesCount > 1 && (
            <StyledCardLikes style={{ paddingLeft: 5 }}>
              {`${likesCount} Likes`}
            </StyledCardLikes>
          )}
          {(likesCount === 0 || likesCount === 1) && (
            <StyledCardLikes style={{ paddingLeft: 5 }}>
              {`${likesCount} Like`}
            </StyledCardLikes>
          )}
        </Section>
        <Section style={{ marginBottom: 5 }}>
          <TouchableOpacity
            onPress={() => {
              // setIsCommentModel(true);
              navigation.navigate("Comments", {
                commentlist: card_detail.getCommentList,
                postid: card_detail.postid,
                from: from,
                postuserid: card_detail.userid,
              });
            }}
          >
            {/* {card_detail.getCommentList &&
              Object.keys(card_detail.getCommentList).length > 1 && (
                <StyledCardComments style={{ paddingLeft: 5 }}>
                  View all{" "}
                  {` ${Object.keys(card_detail.getCommentList).length} `}{" "}
                  comments
                </StyledCardComments>
              )} */}

            {/* {card_detail.getCommentList &&
              Object.keys(card_detail.getCommentList).length === 1 && (
                <StyledCardComments style={{ paddingLeft: 5 }}>
                  View {` ${Object.keys(card_detail.getCommentList).length} `}{" "}
                  comment
                </StyledCardComments>
              )} */}
            {/* )} */}
            <StyledCardComments style={{ paddingLeft: 5 }}>
              View all comments
            </StyledCardComments>
          </TouchableOpacity>

          <SectionEnd style={{ paddingRight: 10 }}>
            <StyledCardDateTime>{datetime}</StyledCardDateTime>
          </SectionEnd>
        </Section>
      </StyledCard>

      {/* Modal for Edit and Delete Option */}
      <View style={{ backgroundColor: "red" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEDModel}
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
                setIsEDModel(false);
                console.log("Pressed");
              }}
            >
              <View style={styles.perviewEDModal}>
                <TouchableOpacity>
                  {/* <Text style={styles.modeltextStyleEDModal}>Edit</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsEDModel(false);
                    setIsDeleteModel(true);
                  }}
                >
                  <Text style={styles.modeltextStyleEDModal}>Delete</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Modal>
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
            onPress={() => {
              console.log("Center View");
            }}
          >
            <View style={styles.perviewModel}>
              <Text style={styles.modeltextStyle}>Delete this Post?</Text>
              <Text
                style={{
                  color: "#bcb8b1",
                  fontSize: 12,
                  fontFamily: CustomFontFamily.six,
                  marginTop: 30,
                  textAlign: "center",
                }}
              >
                Do you really want to delete this post permanently?
              </Text>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteModel(false);
                    RemovePostAndCollectionToUser(
                      "post",
                      card_detail.userid,
                      card_detail.postid
                    );
                    RemovePostAndCollectionToUser(
                      "feed",
                      card_detail.userid,
                      card_detail.postid
                    );

                    if (from === "post") {
                      navigation.navigate("YourPosts");
                    } else if (from === "collection") {
                      navigation.navigate("YourCollections");
                    }

                    ToastMessage("Post has been successfully deleted.");
                  }}
                >
                  <Text style={[styles.modeltextStyle, { color: "#01baef" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteModel(false);
                    console.log("Pressed Don't delete");
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

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: CustomColors.primary,
  },

  spacing: {
    padding: 10,
    paddingBottom: 2,
    paddingTop: 0,
  },
  poemLayout: (bgColor) => ({
    backgroundColor: bgColor,
    margin: 10,
    marginTop: 0,
    height: 445,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 0,
  }),
  textTitle: {
    margin: 30,
    marginBottom: 20,
  },
  textPoem: {
    marginLeft: 30,
    marginRight: 30,
  },
  textAuthor: {
    margin: 30,
    marginTop: 20,
  },

  textStyle: (align, textcolor, fontfamily, fontsize) => ({
    textAlign: align,
    color: textcolor,
    fontFamily: fontfamily,
    fontSize: fontsize,
  }),

  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  perviewModel: {
    backgroundColor: "#242423",
    padding: 30,
    elevation: 5,
    borderRadius: 10,
    height: 250,
    width: 250,
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
