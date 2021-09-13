import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { CustomColors } from "../styles/styles.component";
import * as Picker from "expo-image-picker";
import {
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { Theme } from "../styles/theme.reactnativepaper.component";
import {
  UploadProfile,
  EditYourProfile,
} from "../../service/firebase/firebase.crud.service";
import * as firebase from "firebase";
import { ProfileObject } from "./profile.object.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../common/toast.message.component";
import { SafeArea } from "../styles/safe.area.component";

const APPNAME = "tarah";
let PATH = "";

export const EditProfile = ({ navigation, route }) => {
  const { details } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [image, setImage] = useState(details.image);
  const [isImage, setIsImage] = useState(true);
  const [name, setName] = useState(details.name);
  const [userName, setUserName] = useState(details.username);
  const [bio, setBio] = useState(details.bio);
  const [userid, setUserid] = useState(details.userid);

  const SetDetails = (obj) => {
    let data = { ...obj, bio: bio, name: name };
    return data;
  };

  const PickImage = async () => {
    let result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImage(true);
    }
  };

  const RetriveProfile = (userid) => {
    PATH = `${APPNAME}/Users/${userid}`;
    const ref = firebase.storage().ref(PATH);
    console.log("Ref", ref);
    ref
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <SafeArea>
      <View>
        <SectionEditProfile>
          <IconButton
            size={30}
            icon="close"
            onPress={() => {
              navigation.navigate("Settings");
              console.log("Pressed");
            }}
          />
          <StyledEditProfile>Edit Profile</StyledEditProfile>
          <SectionEnd>
            {!isloading ? (
              <IconButton
                size={30}
                icon="check"
                color={CustomColors.primary}
                onPress={() => {
                  setIsloading(true);
                  if (isImage) {
                    EditYourProfile(SetDetails(details));
                    UploadProfile(userid, image)
                      .then(() => {
                        ToastMessage(
                          "Your profile has been updated successfully."
                        );
                        setIsloading(false);
                        AsyncStorage.setItem("profilechanged", "true");
                        AsyncStorage.setItem("username", userName);
                        navigation.navigate("YourProfile");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    console.log("Image Else part");
                    EditYourProfile(SetDetails(details));
                    ToastMessage("Your profile has been updated successfully.");
                    setIsloading(false);
                    navigation.navigate("YourProfile");
                  }
                  console.log("Check Pressed ");
                }}
              />
            ) : (
              <View style={{ marginRight: 10 }}>
                <ActivityIndicator size={30} color={CustomColors.primary} />
              </View>
            )}
          </SectionEnd>
        </SectionEditProfile>
        <View
          style={
            ([styles.ProfileImage],
            {
              alignSelf: "center",
              alignItems: "center",
              marginTop: 10,
            })
          }
        >
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

          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              color: CustomColors.primary,
            }}
            onPress={() => {
              PickImage();
              console.log("Change Profile Photo Pressed");
            }}
          >
            Change Profile Photo
          </Text>
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
            theme={Theme}
            mode="outlined"
            label="Name"
            placeholder="Name"
            maxLength={35}
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            theme={Theme}
            mode="outlined"
            label="Username"
            maxLength={25}
            disabled={true}
            placeholder="Username"
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
          />
        </View>

        <View style={{ margin: 10 }}>
          <TextInput
            theme={Theme}
            mode="outlined"
            label="Bio"
            placeholder="Bio"
            multiline={true}
            value={bio}
            onChangeText={(bio) => setBio(bio)}
          />
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  ProfileImage: {
    marginTop: 6,
    marginBottom: 13,
    paddingLeft: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: CustomColors.primary,
  },
});
