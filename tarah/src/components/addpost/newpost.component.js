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
} from "../../service/firebase/firebase.crud.service";

export const NewPost = ({ navigation, route }) => {
  const { editobject } = route.params;

  // console.log(editobject);

  const [isloading, setIsloading] = useState(false);
  const [textAlign, setTextAlign] = useState(editobject.getTextAlign);
  const [textColor, setTextColor] = useState(editobject.getTextColor);
  const [textFont, setTextFont] = useState(editobject.getTextFont);
  const [textSize, setTextSize] = useState(editobject.getTextSize);
  const [bgColor, setBgColor] = useState(editobject.getBgColor);
  const [caption, setCaption] = useState("");

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
              console.log("Pressed Close");
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
                  StorePost(obj);
                  AddPostAndCollectionListToUser("post", obj);
                  setTimeout(() => {
                    setIsloading(false);
                    navigation.navigate("Home", { reload: true });
                  }, 4000);
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
                  styles.textStyle(
                    textAlign,
                    textColor,
                    textFont,
                    textSize + 5
                  ),
                ]}
              >
                @{editobject.getAuthor}
              </Text>
            </ScrollView>
          </View>
        </ScrollView>
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
    height: 445,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
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
});
