import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, IconButton, Button } from "react-native-paper";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import * as Picker from "expo-image-picker";
import {
  Section,
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { Theme } from "../styles/theme.reactnativepaper.component";
import {
  UploadProfile,
  StoreYourProfile,
  StoreUsersCredentials,
  ReadUserCredentials,
  RetriveProfile,
} from "../../service/firebase/firebase.crud.service";
import * as firebase from "firebase";
import { ProfileObject } from "./profile.object.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateUserId } from "../../service/IDGeneration/Id.generation.service";
import { ToastMessage } from "../common/toast.message.component";
import { SafeArea } from "../styles/safe.area.component";
import * as Google from "expo-google-app-auth";
import { schedulePushNotification } from "../../service/notification/notification.component";

const APPNAME = "tarah";
let PATH = "";

export const CreateProfile = ({ navigation, route }) => {
  const { from } = route.params;

  const [isloading, setIsloading] = useState(false);
  const [image, setImage] = useState();
  const [isImage, setIsImage] = useState(true);
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();
  const [gmail, setGmail] = useState();
  const [userid, setUserid] = useState();
  const [isWelcome, setIsWelcome] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAleadyUser, setIsAleadyUser] = useState(false);
  const [alreadyGmail, setAlreadyGmail] = useState();
  const [alreadyPassword, setAlreadyPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmpwd, setConfirmPwd] = useState();
  const [viewpwd, setViewpwd] = useState(false);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [viewpwd2, setViewpwd2] = useState(false);
  const [eyeIcon2, setEyeIcon2] = useState("eye");
  const [googleIndicator, setGoogleIndicator] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [forgetUsername, setForgetUsername] = useState();
  const [forgetUserId, setForgetUserId] = useState();
  const [forgetGmail, setForgetGmail] = useState();
  const [forgetNewPassword, setForgetNewPassword] = useState();
  const [forgetConfirmNewPassword, setForgetConfirmNewPassword] = useState();

  const createProfile = () => {
    (ProfileObject.userid = userid),
      (ProfileObject.name = name.trim()),
      (ProfileObject.username = userName.trim()),
      (ProfileObject.bio = bio.trim()),
      (ProfileObject.gmail = gmail.trim()),
      (ProfileObject.password = password.trim()),
      (ProfileObject.postcount = "0"),
      (ProfileObject.followerscount = "0"),
      (ProfileObject.followingcount = "0");

    return ProfileObject;
  };

  const PickImage = async () => {
    let result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImage(true);
    }
  };

  const GoogleSignin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "83747186809-m7143ckbis8ssrrbvibl8h2pptdu2ac0.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("isForgetPassword", isForgetPassword);
        if (isForgetPassword) {
          setIsAleadyUser(false);
          setForgetGmail(result.user.email);
          let obj = ReadUserCredentials(result.user.email);
          setTimeout(() => {
            if (obj) {
              console.log("yes Object");
              console.log(obj);
              setIsloading(false);
              setForgetUsername(obj.username);
              setForgetUserId(obj.userid);
            } else {
              ToastMessage("No records found this Gmail.");
            }
          }, 3000);
        } else {
          //console.log(result.accessToken);
          console.log("id", result.user.id);
          console.log("name", result.user.name);
          console.log("givenName", result.user.givenName);
          console.log("familyName", result.user.familyName);
          // console.log("photoUrl", result.user.photoUrl);
          console.log("email", result.user.email);

          setName(result.user.givenName + " " + result.user.familyName);
          setUserName(result.user.name);
          setGmail(result.user.email);
          setUserid("TARAHUSER" + result.user.id);
          setIsWelcome(false);
          setIsNewUser(true);
          setIsloading(false);
        }
      } else {
        console.log("cancelled");
        if (isForgetPassword) {
          ToastMessage("You have canceled the login.");
        } else {
          ToastMessage("You have canceled the sign-in.");
        }
        //setGoogleIndicator(false);
        setIsloading(false);
      }
    } catch (e) {
      console.log("error", e);
      setIsloading(false);
      //setGoogleIndicator(false);
    }
  };

  const CreatAccount = () => {
    console.log("IsImage", isImage);
    setIsloading(true);
    if (password === confirmpwd) {
      if (image && name && bio && userName && password && confirmpwd) {
        AsyncStorage.setItem("userid", userid.trim());
        AsyncStorage.setItem("username", userName.trim());
        StoreYourProfile(createProfile());
        StoreUsersCredentials(createProfile());
        UploadProfile(userid, image);
        setTimeout(() => {
          ToastMessage("Your profile has been created successfully!");
          setIsloading(false);
          schedulePushNotification();
          navigation.navigate("AddPost", { from: "home" });
        }, 3000);
      } else {
        ToastMessage("Kindly fill in all details and upload your profile.");
        setIsloading(false);
      }
    } else {
      ToastMessage("Kindly check the password.");
      setIsloading(false);
    }

    console.log("Check Pressed ");
  };

  const AlreadyLogin = () => {
    setIsloading(true);
    if (alreadyGmail.includes("@gmail.com")) {
      let gmail = alreadyGmail.toLowerCase();
      console.log(gmail);
      let obj = ReadUserCredentials(gmail);
      console.log(obj);
      setTimeout(() => {
        if (obj) {
          console.log("Success", obj);
          if (obj.gmail == alreadyGmail && obj.password === alreadyPassword) {
            AsyncStorage.setItem("userid", obj.userid);
            AsyncStorage.setItem("username", obj.username);
            navigation.navigate("AddPost", { from: "home" });
            ToastMessage("You have logged in successfully");
          } else {
            ToastMessage("Invalid Gmail or password, try again");
          }
          setIsloading(false);
        } else {
          ToastMessage("Invalid Gmail or password, try again");
          setIsloading(false);
        }
      }, 3000);
    } else {
      ToastMessage("Check your Gmail.");
    }
  };

  const ForgetUserLogin = () => {
    if (forgetUsername && forgetGmail) {
      if (forgetNewPassword && forgetNewPassword === forgetConfirmNewPassword) {
        AsyncStorage.setItem("userid", forgetUserId);
        AsyncStorage.setItem("username", forgetUsername);
        let obj = {
          username: forgetUsername,
          gmail: forgetGmail,
          userid: forgetUserId,
          password: forgetNewPassword,
        };
        StoreUsersCredentials(obj);
        setTimeout(() => {
          ToastMessage("Password changed successfully.");
          setIsloading(false);
          navigation.navigate("AddPost", { from: "home" });
        }, 3000);
      } else {
        ToastMessage("Enter the valid Password.");
      }
    } else {
      ToastMessage("Choose the existing account.");
    }
  };

  return (
    <SafeArea>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 5 }}>
          <SectionEditProfile>
            <IconButton
              size={30}
              icon="close"
              onPress={() => {
                if (from === "home") {
                  navigation.navigate("Home");
                } else if (from === "profile") {
                  navigation.navigate("YourProfile");
                }
              }}
            />
            {!isAleadyUser && (
              <StyledEditProfile>Create Profile</StyledEditProfile>
            )}
            {isAleadyUser && (
              <StyledEditProfile>Login Profile</StyledEditProfile>
            )}
            <SectionEnd>
              {/* {!isloading ? (
                <IconButton
                  size={30}
                  icon="check"
                  color={CustomColors.primary}
                  onPress={() => CreatAccount()}
                />
              ) : ( */}
              {isloading && (
                <View style={{ marginRight: 10 }}>
                  <ActivityIndicator size={30} color={CustomColors.primary} />
                </View>
              )}
            </SectionEnd>
          </SectionEditProfile>

          {isWelcome && (
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    fontFamily: CustomFontFamily.second,
                    fontSize: 50,
                    justifyContent: "center",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  Welcome to Tarah!
                </Text>
              </View>

              <View>
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    marginTop: 50,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/tarah/tarah.png")}
                />
              </View>

              <View
                style={{
                  margin: 20,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  To continue, You need to sign in with your Google account.
                  Google will share your name, email, and profile picture with
                  your respective Gmail account.
                </Text>
                <Text style={{ textAlign: "center", margin: 10, fontSize: 12 }}>
                  This app is to express inner feelings in the form of poems and
                  quotes. This app will access your gallery just for the profile
                  picture purpose.
                </Text>
              </View>
              <View>
                <Section>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: CustomFontFamily.second,
                    }}
                  >
                    SignIn
                  </Text>
                  <SectionEnd style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsAleadyUser(true);
                        setIsWelcome(false);
                      }}
                    >
                      <Text style={{ color: "blue", fontStyle: "italic" }}>
                        Already have account?
                      </Text>
                    </TouchableOpacity>
                  </SectionEnd>
                </Section>
              </View>

              <View style={{ margin: 10, marginTop: 25 }}>
                <Button
                  theme={Theme}
                  icon="google"
                  mode="contained"
                  onPress={() => {
                    //setGoogleIndicator(true);
                    setIsloading(true);
                    GoogleSignin();
                  }}
                >
                  Sign in with Google
                </Button>
              </View>

              {/* {googleIndicator && (
                <View>
                  <ActivityIndicator size={50} color={CustomColors.primary} />
                </View>
              )} */}
            </View>
          )}

          {isAleadyUser && (
            <View>
              {/* <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    fontFamily: CustomFontFamily.second,
                    fontSize: 50,
                    justifyContent: "center",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  Welcome to Tarah!
                </Text>
              </View> */}

              <View>
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    marginTop: 50,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/tarah/tarah.png")}
                />
              </View>

              <View
                style={{
                  margin: 20,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  To continue this app, You need to enter your Gmail and
                  password. This app will get your name, Gmail, and profile the
                  picture with your respective Gmail account.
                </Text>
                <Text style={{ textAlign: "center", margin: 10, fontSize: 12 }}>
                  This app is to express inner feelings in the form of poems and
                  quotes. This app will access your gallery just for the profile
                  picture purpose.
                </Text>
                <Text style={{ textAlign: "center", margin: 10, fontSize: 12 }}>
                  Forget password link will help you log in with a google
                  account.
                </Text>
              </View>
              <View>
                <Section>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: CustomFontFamily.second,
                    }}
                  >
                    Login
                  </Text>
                  <SectionEnd style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsForgetPassword(true);
                        setIsAleadyUser(false);
                        //setIsloading(true);
                      }}
                    >
                      <Text style={{ color: "blue", fontStyle: "italic" }}>
                        Forget password?
                      </Text>
                    </TouchableOpacity>
                  </SectionEnd>
                </Section>
              </View>

              <View style={{ margin: 10, marginTop: 25 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Gmail"
                  maxLength={25}
                  placeholder="Enter your Gmail"
                  value={alreadyGmail}
                  onChangeText={(alreadyGmail) => setAlreadyGmail(alreadyGmail)}
                />
              </View>
              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Password"
                  placeholder="Password"
                  secureTextEntry={!viewpwd}
                  value={alreadyPassword}
                  onChangeText={(alreadyPassword) =>
                    setAlreadyPassword(alreadyPassword)
                  }
                  right={
                    <TextInput.Icon
                      name={eyeIcon}
                      onPress={() => {
                        if (eyeIcon === "eye") {
                          setViewpwd(true);
                          setEyeIcon("eye-off");
                        } else {
                          setViewpwd(false);
                          setEyeIcon("eye");
                        }
                      }}
                    />
                  }
                />
              </View>

              <View style={{ margin: 10, marginTop: 25 }}>
                <Button
                  theme={Theme}
                  icon="google"
                  mode="contained"
                  onPress={() => {
                    AlreadyLogin();
                  }}
                >
                  LOGIN
                </Button>
              </View>

              {/* {googleIndicator && (
                <View>
                  <ActivityIndicator size={50} color={CustomColors.primary} />
                </View>
              )} */}
            </View>
          )}

          {isForgetPassword && !isAleadyUser && (
            <View>
              <View>
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    marginTop: 0,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/tarah/tarah.png")}
                />
              </View>

              <View
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  To continue this app, click on choose existing account? then
                  You need to select your existing Gmail for this app. This app
                  will get your username, Gmail, and profile picture, and also
                  you can change your password here.
                </Text>
              </View>
              <View>
                <Section>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: CustomFontFamily.second,
                    }}
                  >
                    Change Password
                  </Text>
                  <SectionEnd style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        // setIsAleadyUser(true);
                        // setIsWelcome(false);
                        setIsForgetPassword(true);
                        setIsloading(true);
                        GoogleSignin();
                      }}
                    >
                      <Text style={{ color: "blue", fontStyle: "italic" }}>
                        Choose an existing account?
                      </Text>
                    </TouchableOpacity>
                  </SectionEnd>
                </Section>
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Username"
                  maxLength={25}
                  disabled={true}
                  placeholder="Username"
                  value={forgetUsername}
                  onChangeText={(forgetUsername) =>
                    setForgetUsername(forgetUsername)
                  }
                />
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Gmail"
                  maxLength={25}
                  disabled={true}
                  placeholder="Enter your Gmail"
                  value={forgetGmail}
                  onChangeText={(forgetGmail) => setForgetGmail(forgetGmail)}
                />
              </View>
              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="New Password"
                  placeholder="New Password"
                  secureTextEntry={!viewpwd}
                  value={forgetNewPassword}
                  onChangeText={(forgetNewPassword) =>
                    setForgetNewPassword(forgetNewPassword)
                  }
                  right={
                    <TextInput.Icon
                      name={eyeIcon}
                      onPress={() => {
                        if (eyeIcon === "eye") {
                          setViewpwd(true);
                          setEyeIcon("eye-off");
                        } else {
                          setViewpwd(false);
                          setEyeIcon("eye");
                        }
                      }}
                    />
                  }
                />
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  secureTextEntry={!viewpwd}
                  value={forgetConfirmNewPassword}
                  onChangeText={(forgetConfirmNewPassword) =>
                    setForgetConfirmNewPassword(forgetConfirmNewPassword)
                  }
                  right={
                    <TextInput.Icon
                      name={eyeIcon}
                      onPress={() => {
                        if (eyeIcon === "eye") {
                          setViewpwd(true);
                          setEyeIcon("eye-off");
                        } else {
                          setViewpwd(false);
                          setEyeIcon("eye");
                        }
                      }}
                    />
                  }
                />
              </View>

              <View style={{ margin: 10, marginTop: 25 }}>
                <Button
                  theme={Theme}
                  mode="contained"
                  onPress={() => {
                    if (forgetUsername && forgetGmail) {
                      if (
                        forgetNewPassword &&
                        forgetNewPassword === forgetConfirmNewPassword
                      ) {
                        setIsloading(true);
                        ForgetUserLogin();
                      } else {
                        ToastMessage("Enter the valid Password.");
                      }
                    } else {
                      ToastMessage("Choose the existing account.");
                    }
                  }}
                >
                  Change password & Login
                </Button>
              </View>
            </View>
          )}

          {isNewUser && !isForgetPassword && (
            <View>
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
                <Image
                  source={{ uri: image }}
                  style={styles.profileImage}
                  onPress={() => {
                    null;
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    PickImage();
                    console.log("Change Profile Photo Pressed");
                  }}
                >
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 15,
                      color: CustomColors.primary,
                    }}
                  >
                    Upload Profile Photo
                  </Text>
                </TouchableOpacity>
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
                  placeholder="Username"
                  value={userName}
                  onChangeText={(userName) => setUserName(userName)}
                />
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Gmail"
                  maxLength={25}
                  placeholder="Gmail"
                  value={gmail}
                  disabled={true}
                  onChangeText={(gmail) => setGmail(gmail)}
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

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Password"
                  placeholder="Password"
                  secureTextEntry={!viewpwd}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  right={
                    <TextInput.Icon
                      name={eyeIcon}
                      onPress={() => {
                        if (eyeIcon === "eye") {
                          setViewpwd(true);
                          setEyeIcon("eye-off");
                        } else {
                          setViewpwd(false);
                          setEyeIcon("eye");
                        }
                      }}
                    />
                  }
                />
              </View>

              <View style={{ margin: 10 }}>
                <TextInput
                  theme={Theme}
                  mode="outlined"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  secureTextEntry={!viewpwd2}
                  value={confirmpwd}
                  onChangeText={(confirmpwd) => {
                    if (password.length <= confirmpwd.length) {
                      if (password !== confirmpwd) {
                        ToastMessage("Passwords are not matching. Try again");
                      }
                    }
                    setConfirmPwd(confirmpwd);
                  }}
                  right={
                    <TextInput.Icon
                      name={eyeIcon2}
                      onPress={() => {
                        if (eyeIcon2 === "eye") {
                          setViewpwd2(true);
                          setEyeIcon2("eye-off");
                        } else {
                          setViewpwd2(false);
                          setEyeIcon2("eye");
                        }
                      }}
                    />
                  }
                />
              </View>

              <View style={{ margin: 10 }}>
                <Button
                  theme={Theme}
                  mode="contained"
                  onPress={() => CreatAccount()}
                >
                  Create Account
                </Button>
              </View>

              <View>
                <Section>
                  <SectionEnd style={{ marginRight: 10, marginBottom: 20 }}>
                    <Text
                      style={{ color: "blue", fontStyle: "italic" }}
                      onPress={() => GoogleSignin()}
                    >
                      SignIn with a different google account!
                    </Text>
                  </SectionEnd>
                </Section>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
