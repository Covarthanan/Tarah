import React, { useState, useEffect } from "react";
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
} from "react-native";
import {
  Section,
  SectionEnd,
  SectionColumn,
  StyledProfileTitle,
  StyledProfileName,
  StyledProfilePostFollow,
} from "../card/cardstyle.component";
import { CustomColors } from "../styles/styles.component";
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
  // let postList = {};
  let collectionList = {};
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
      console.log("my_user_id", my_user_id);
    }
  });

  const [isPost, setIsPost] = useState(true);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isImage, setIsImage] = useState(true);
  //const [postList, setPostList] = useState();

  const [isFollowModel, setIsFollowModel] = useState(false);
  const [isMeFollowing, setIsMeFollowing] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(true);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);

  const ReadUserProfile = (userid) => {
    PATH = `${APPNAME}/Users/${userid}/`;
    const data = firebase.database().ref(PATH);
    data.on("value", (dtasnp) => {
      details = dtasnp.val();

      // console.log("User", details);

      setName(details.name);
      setUserName(details.username);
      setBio(details.bio);

      if (
        details.getFollowerList &&
        Object.keys(details.getFollowerList).length > 0
      ) {
        setFollowersCount(Object.keys(details.getFollowerList).length);
        Object.keys(details.getFollowerList).forEach((element) => {
          if (my_user_id === element) {
            console.log(my_user_id, element);
            setIsMeFollowing(true);
          }
        });
      }
      if (
        details.getFollowingList &&
        Object.keys(details.getFollowingList).length > 0
      ) {
        setFollowingCount(Object.keys(details.getFollowingList).length);
      }
      if (details.getPostList && Object.keys(details.getPostList).length > 0) {
        setPostCount(Object.keys(details.getPostList).length);
      }

      setTimeout(() => {
        if (my_user_id !== details.userid) {
          setIsMyProfile(false);
        }
      }, 500);

      setIsLoading(false);
    });

    return details;
  };

  const RetriveImage = (userid) => {
    PATH = `${APPNAME}/Users/${userid}`;
    const ref = firebase.storage().ref(PATH);
    // console.log("Ref", ref);
    ref
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        details = { ...details, image: url };
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    ReadUserProfile(userid);
    if (isImage) {
      RetriveImage(userid);
    }
  });

  const CreateFollowObj = () => {
    return {
      followid: userid,
      folllowusername: userName,
      userid: my_user_id,
      username: my_user_name,
    };
  };

  return (
    <SafeArea>
      <View>
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
                // console.log("Calling Home");
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
                {!isImage ? (
                  <Image
                    source={require("../../../assets/tarah/tarah.png")}
                    style={styles.profileImage}
                    onPress={() => {
                      null;
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: image }}
                    style={styles.profileImage}
                    onPress={() => {
                      null;
                    }}
                  />
                )}
              </View>
            )}
          </SectionColumn>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourPosts", {
                title: "Posts",
                userid: userid,
                postlist: details.getPostList,
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

        {!isMyProfile && (
          <View>
            {!isMeFollowing && (
              <View style={{ padding: 10 }}>
                <Button
                  theme={Theme}
                  mode="contained"
                  onPress={() => {
                    if (my_user_id) {
                      console.log("isMeFollowing", isMeFollowing);
                      AddFollow(CreateFollowObj());
                    } else {
                      navigation.navigate("CreateProfile", { from: "profile" });
                    }
                  }}
                >
                  Follow
                </Button>
              </View>
            )}

            {isMeFollowing && (
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
          </View>
        )}

        <Section>
          <View style={{ marginLeft: 30 }}>
            <IconButton
              icon="account-edit"
              size={30}
              onPress={() => {
                if (my_user_id === userid) {
                  navigation.navigate("EditProfile", { details: details });
                } else {
                  ToastMessage("You can't edit this profile.");
                }
                // console.log("Edit Profile Pressed");
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
                  postlist: details.getPostList,
                });
                // console.log("Edit Profile Pressed");
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
                  collectionlist: details.getCollectionList,
                });
              }}
            />
          </View>
        </Section>
      </View>

      {/* Modal for Edit and Delete Option */}
      <View style={{ backgroundColor: "red" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFollowModel}
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
                setIsFollowModel(false);
                console.log("Pressed");
              }}
            >
              <View style={styles.perviewEDModal}>
                <TouchableOpacity
                  onPress={() => {
                    RemoveFollow(CreateFollowObj());
                    if (followersCount > 0) {
                      console.log(followersCount);
                      setFollowersCount(followersCount - 1);
                      setIsMeFollowing(false);
                    }
                    setIsFollowModel(false);
                  }}
                >
                  <Text style={styles.modeltextStyleEDModal}>Unfollow</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
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
  centeredViewEDModal: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  perviewEDModal: {
    backgroundColor: "#242423",
    padding: 30,
    elevation: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 639,
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
