import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
} from "react-native";
import {
  Section,
  SectionEditProfile,
  SectionEnd,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { TextInput, IconButton } from "react-native-paper";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import { Theme } from "../styles/theme.reactnativepaper.component";
import { ColorList, ColorInfo } from "./color.component";
import { TextFontList, TextInfo } from "./text.component";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import { SafeArea } from "../styles/safe.area.component";
import { AppContext } from "../../service/context/context.component";
import { CreateUserId } from "../../service/IDGeneration/Id.generation.service";
import {
  AddPostAndCollectionListToUser,
  StorePost,
  UploadPost,
} from "../../service/firebase/firebase.crud.service";
import * as firebase from "firebase";

const APPNAME = "tarah";
let PATH = "";

export const NewPost = ({ navigation, route }) => {
  const { editobject } = route.params;

  let attmptCompress = 0;

  // console.log(editobject);

  const [isloading, setIsloading] = useState(false);
  const [textAlign, setTextAlign] = useState(editobject.getTextAlign);
  const [textColor, setTextColor] = useState(editobject.getTextColor);
  const [textFont, setTextFont] = useState(editobject.getTextFont);
  const [textSize, setTextSize] = useState(editobject.getTextSize);
  const [bgColor, setBgColor] = useState(editobject.getBgColor);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(editobject.imageUri);
  const [isCompressModel, setIsCompressModel] = useState(false);

  const newpostObj = () => {
    let newpost = {};
    return (newpost = {
      postid: CreateUserId("post"),
      ...editobject,
      getDateTime: Date.now(),
      getCaption: caption,
      getLikesCount: 0,

      getCommentList: [
        {
          userid: "Tarah",
          comment: "Thanks for your post and Keep rocking😊",
          datetime: Date.now(),
          commentid: CreateUserId("comment"),
        },
      ],
      getCollectionList: [
        {
          userid: "Tarah",
          flag: true,
        },
      ],
    });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const GetPostURI = (object) => {
    PATH = `${APPNAME}/Posts/${object.postid}`;
    const ref = firebase.storage().ref(PATH);
    ref
      .getDownloadURL()
      .then((url) => {
        let obj = { ...object, postURI: url };
        console.log(obj);
        StorePost(obj);
        AddPostAndCollectionListToUser("post", obj);
        setIsCompressModel(false);
        wait(2000).then(() => {
          navigation.navigate("Home", { reload: true });
          setIsloading(false);
        });
      })
      .catch((e) => {
        wait(1000).then(() => {
          attmptCompress = attmptCompress + 1;
          GetPostURI(object);
          console.log("Post URL ila", e);
          console.log("attmptCompress", attmptCompress);
          if (attmptCompress === 1) {
            setIsCompressModel(true);
          }
        });
      });
  };

  return (
    <SafeArea>
      <View nestedScrollEnabled={true} style={{ marginBottom: 0 }}>
        <StatusBar style="auto" />
        <SectionEditProfile>
          <IconButton
            size={30}
            icon="arrow-left"
            onPress={() => {
              navigation.navigate("EditPost");
            }}
          />
          <StyledEditProfile>Post..🥰</StyledEditProfile>

          <SectionEnd>
            {!isloading ? (
              <IconButton
                size={30}
                icon="check"
                color={CustomColors.primary}
                onPress={() => {
                  setIsloading(true);
                  let obj = newpostObj();
                  if (image) {
                    UploadPost(obj.postid, image);
                    wait(3000).then(() => {
                      GetPostURI(obj);
                      console.log("Calling UploadPost");
                    });
                  } else {
                    console.log("Calling Else");
                    // StorePost(obj);
                    // AddPostAndCollectionListToUser("post", obj);
                    // wait(3000).then(() => {
                    //   setIsloading(false);
                    //   navigation.navigate("Home", { reload: true });
                    // });
                  }
                }}
              />
            ) : (
              <View style={{ marginRight: 10 }}>
                <ActivityIndicator size={30} color={CustomColors.primary} />
              </View>
            )}
          </SectionEnd>
        </SectionEditProfile>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.spacing]}>
            <TextInput
              theme={Theme}
              mode="outlined"
              multiline={true}
              label="Write a caption"
              placeholder="Write a caption..."
              value={caption}
              onChangeText={(caption) => {
                setCaption(caption);
              }}
            />
          </View>

          <View style={styles.poemLayout(bgColor)}>
            <Text
              style={[
                styles.textTitle,
                styles.textStyle(textAlign, textColor, textFont, textSize + 10),
              ]}
            >
              {editobject.getTitle}
            </Text>
            <Text
              style={[
                styles.textPoem,
                styles.textStyle(textAlign, textColor, textFont, textSize),
              ]}
            >
              {`${editobject.getPoem}`}
            </Text>
            <Text
              style={[
                styles.textAuthor,
                styles.textStyle(textAlign, textColor, textFont, textSize + 5),
              ]}
            >
              @{editobject.getAuthor}
            </Text>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 370.5,
                  height: 370,
                  borderWidth: 1,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal Compression */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCompressModel}
        >
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
              <Text style={styles.modeltextStyle}>Compression!</Text>
              <Text
                style={{
                  color: "#bcb8b1",
                  fontSize: 12,
                  fontFamily: CustomFontFamily.six,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Image size and resolution are high, So image compression is in
                progress ...
              </Text>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={[
                    styles.modeltextStyle,
                    { color: "#01baef", paddingBottom: 10 },
                  ]}
                >
                  Please wait
                </Text>
                <ActivityIndicator color="#01baef" size={50} />
              </View>
            </View>
          </View>
        </Modal>
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
  poemLayout: (bgColor) => ({
    backgroundColor: bgColor,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 70,
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
