import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
} from "react-native";
import {
  Section,
  SectionEnd,
  SectionColumn,
  StyledProfileTitle,
  StyledProfileName,
  StyledProfilePostFollow,
} from "../card/cardstyle.component";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import { IconButton, TextInput, Button } from "react-native-paper";
import { Theme } from "../styles/theme.reactnativepaper.component";
import { ProfileObject } from "./profile.object.component";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeArea } from "../styles/safe.area.component";
import { YourProfileTabScreen } from "../navigation/yourprofile.tabscreen.component";
import { PostGrid } from "../feed/postgrid.component";
import {
  AddFollow,
  ChangeObjToArry,
  RemoveFollow,
} from "../../service/firebase/firebase.crud.service";
import { YourPosts } from "./yourposts.component";
import { ToastMessage } from "../common/toast.message.component";

const APPNAME = "tarah";
let PATH = "";

export const YourProfile = ({ navigation, route }) => {
  let details = {};

  const { userid } = route.params;
  const { username } = route.params;

  let my_user_name = "";
  let my_user_id = "";
  AsyncStorage.getItem("username").then((value) => {
    if (value !== null) {
      my_user_name = value;
    }
  });

  AsyncStorage.getItem("userid").then((value) => {
    if (value !== null) {
      my_user_id = value;
    }
  });

  const [isPost, setIsPost] = useState(true);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [userid$, setUserId$] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isImage, setIsImage] = useState(true);
  const [postList, setPostList] = useState();

  const [isFollowModel, setIsFollowModel] = useState(false);
  const [isShowFollowBtn, setIsShowFollowBtn] = useState(false);
  const [isShowFollowingBtn, setIsShowFollowingBtn] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState();

  const ReadUserProfile = (userid) => {
    let following = false;

    PATH = `${APPNAME}/Users/${userid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      details = dtasnp.val();

      setUserData(details);
      setName(details.name);
      setUserName(details.username);
      setBio(details.bio);

      if (
        details.getFollowerList &&
        Object.keys(details.getFollowerList).length > 0
      ) {
        setFollowersCount(Object.keys(details.getFollowerList).length);

        AsyncStorage.getItem("userid").then((value) => {
          if (value !== null) {
            Object.keys(details.getFollowerList).forEach((element) => {
              if (value === element) {
                following = true;
              }
            });
            if (following) {
              setIsShowFollowingBtn(true);
            } else {
              setIsShowFollowBtn(true);
            }
          }
        });
      } else {
        AsyncStorage.getItem("userid").then((value) => {
          if (value !== null) {
            console.log("value", value);
            if (value !== details.userid) {
              setIsShowFollowBtn(true);
            }
          }
        });
        setFollowersCount(0);
      }

      if (
        details.getFollowingList &&
        Object.keys(details.getFollowingList).length > 0
      ) {
        setFollowingCount(Object.keys(details.getFollowingList).length);
      } else {
        setFollowingCount(0);
      }

      if (details.getPostList && Object.keys(details.getPostList).length > 0) {
        setPostCount(Object.keys(details.getPostList).length);
        setPostList(details.getPostList);
      } else {
        setPostCount(0);
      }

      setIsLoading(false);
    });

    return details;
  };

  const RetriveImage = (userid) => {
    PATH = `${APPNAME}/Users/${userid}`;
    const ref = firebase.storage().ref(PATH);
    ref
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        // details = { ...details, image: url };
        details = { ...userData, image: url };
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    setIsShowFollowingBtn(false);
    setIsShowFollowBtn(false);
    ReadUserProfile(userid);
    if (isImage) {
      RetriveImage(userid);
    }
  }, [userid]);

  const CreateFollowObj = () => {
    return {
      followid: userid,
      folllowusername: userName,
      userid: my_user_id,
      username: my_user_name,
    };
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  });
  return (
    <SafeArea>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Section style={{ marginTop: -10 }}>
          <StyledProfileTitle style={{ paddingLeft: 5 }}>
            {userName}
          </StyledProfileTitle>
          <SectionEnd>
            <IconButton
              icon="home-variant"
              size={30}
              color={CustomColors.primary}
              backgroundColor={CustomColors.bgcolor}
              onPress={() => {
                //RetriveImage(userid);
                navigation.navigate("Home");
              }}
            />
          </SectionEnd>
        </Section>
        <Section style={{ paddingLeft: 5 }}>
          <SectionColumn style={styles.ProfileImage}>
            {isLoading && (
              <ActivityIndicator size={75} color={CustomColors.primary} />
            )}
            {!isLoading && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={styles.profileImage}
                  onPress={() => {
                    null;
                  }}
                />
              </View>
            )}
          </SectionColumn>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourPosts", {
                title: "Posts",
                userid: userid,
                postlist: postList,
              });
            }}
          >
            <SectionColumn style={styles.PostAndFollow}>
              <Section>
                <StyledProfilePostFollow>{postCount}</StyledProfilePostFollow>
              </Section>
              <Section>
                <Text>Posts</Text>
              </Section>
            </SectionColumn>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("YourFollowers", { userid: userid })
            }
          >
            <SectionColumn style={styles.PostAndFollow}>
              <Section>
                <StyledProfilePostFollow>
                  {followersCount}
                </StyledProfilePostFollow>
              </Section>
              <Section>
                <Text>Followers</Text>
              </Section>
            </SectionColumn>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("YourFollowings", { userid: userid })
            }
          >
            <SectionColumn style={styles.PostAndFollow}>
              <Section>
                <StyledProfilePostFollow>
                  {followingCount}
                </StyledProfilePostFollow>
              </Section>
              <Section>
                <Text>Following</Text>
              </Section>
            </SectionColumn>
          </TouchableOpacity>
        </Section>

        <Section>
          <Section style={{ paddingRight: 10 }}>
            <StyledProfileName>{name}</StyledProfileName>
          </Section>
        </Section>
        <Section style={{ marginBottom: 10 }}>
          <Section style={{ paddingRight: 10 }}>
            <Text>{bio}</Text>
          </Section>
        </Section>

        {isShowFollowBtn && (
          <View style={{ padding: 10 }}>
            <Button
              theme={Theme}
              mode="contained"
              onPress={() => {
                if (my_user_id) {
                  AddFollow(CreateFollowObj());
                  setIsShowFollowBtn(false);
                  setIsShowFollowingBtn(true);
                } else {
                  navigation.navigate("CreateProfile", { from: "profile" });
                }
              }}
            >
              Follow
            </Button>
          </View>
        )}

        {!isShowFollowBtn && isShowFollowingBtn && (
          <View style={{ padding: 10 }}>
            <Button
              theme={Theme}
              mode="contained"
              onPress={() => {
                setIsFollowModel(true);
              }}
            >
              Following
            </Button>
          </View>
        )}

        <Section>
          <View style={{ marginLeft: 30 }}>
            <IconButton
              icon="cog"
              size={30}
              onPress={() => {
                if (my_user_id === userid) {
                  navigation.navigate("Settings", {
                    details: { ...userData, image: image },
                  });
                } else {
                  ToastMessage("You can't have permission this profile.");
                }
              }}
            />
          </View>
          <View style={{ marginLeft: 80 }}>
            <IconButton
              icon="grid"
              size={25}
              onPress={() => {
                navigation.navigate("YourPosts", {
                  title: "Posts",
                  userid: userid,
                  postlist: userData.getPostList,
                });
              }}
            />
          </View>
          <View style={{ marginLeft: 80 }}>
            <IconButton
              icon="tag"
              size={28}
              onPress={() => {
                navigation.navigate("YourCollections", {
                  title: "Collections",
                  userid: userid,
                  collectionlist: userData.getCollectionList,
                });
              }}
            />
          </View>
        </Section>
        <View style={{ top: 600 }}>
          <Text>Dark Mode</Text>
        </View>
      </ScrollView>

      {/* Modal for Unfollow */}
      <View>
        <Modal animationType="slide" transparent={true} visible={isFollowModel}>
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
              <Text style={styles.modeltextStyle}>Are you sure?</Text>
              <Text
                style={{
                  color: "#bcb8b1",
                  fontSize: 12,
                  fontFamily: CustomFontFamily.six,
                  marginTop: 30,
                  textAlign: "center",
                }}
              >
                Do you really want to unfollow this profile?
              </Text>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowFollowBtn(true);
                    setIsShowFollowingBtn(false);
                    RemoveFollow(CreateFollowObj());
                    if (followersCount > 0) {
                      setFollowersCount(followersCount - 1);
                    }
                    setIsFollowModel(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modeltextStyle,
                      { color: "#01baef", paddingBottom: 10 },
                    ]}
                  >
                    UnFollow
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsFollowModel(false);
                  }}
                >
                  <Text style={styles.modeltextStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: CustomColors.primary,
  },
  PostAndFollow: {
    marginBottom: 13,
    paddingLeft: 33,
  },
  ProfileImage: {
    marginTop: 6,
    marginBottom: 13,
    paddingLeft: 5,
  },
  TabText: {
    marginBottom: 15,
    borderWidth: 3,
    borderColor: CustomColors.bgcolor,
    borderBottomColor: CustomColors.primary,
  },

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
