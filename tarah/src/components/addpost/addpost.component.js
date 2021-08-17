import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
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

export const AddPost = ({ navigation, route }) => {
  let userid = "";
  const { from } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [userName, setUserName] = useState("");
  const [poem, setPoem] = useState("");

  AsyncStorage.getItem("username").then((value) => {
    if (value !== null) {
      //setAuthor(value);
      setUserName(value);
    }
  });

  AsyncStorage.getItem("userid").then((value) => {
    if (value !== null) {
      userid = value;
    }
  });

  const getdetails = () => {
    let poemdetails = {};
    return (poemdetails = {
      userid: userid,
      getTitle: title,
      getAuthor: author,
      getPoem: poem,
      getUserName: userName,
    });
  };

  useEffect(() => {
    if (poem.length > 0) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [poem]);

  return (
    <SafeArea>
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
            console.log("Pressed Close");
          }}
        />
        <StyledEditProfile>Your Poem..😍</StyledEditProfile>

        <SectionEnd>
          {isloading && (
            <IconButton
              size={30}
              icon="arrow-right"
              color={CustomColors.primary}
              onPress={() => {
                console.log("Check Pressed ");
                console.log(getdetails());
                if (title.length > 0 && author.length > 0) {
                  navigation.navigate("EditPost", { details: getdetails() });
                } else {
                  ToastMessage("Kindly fill others fields also.");
                }
              }}
            />
          )}
        </SectionEnd>
      </SectionEditProfile>

      <ScrollView
        nestedScrollEnabled={true}
        style={{ marginTop: 5 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.spacing]}>
          <TextInput
            theme={Theme}
            mode="outlined"
            label="Title"
            placeholder="Title"
            value={title}
            onChangeText={(title) => {
              setTitle(title);
            }}
          />
        </View>
        <View style={styles.spacing}>
          <TextInput
            theme={Theme}
            mode="outlined"
            label="Author"
            placeholder="Author"
            value={author}
            onChangeText={(author) => {
              setAuthor(author);
            }}
          />
        </View>
        <View style={{ padding: 10, marginBottom: 150 }}>
          <TextInput
            theme={Theme}
            multiline={true}
            mode="outlined"
            placeholder="Start feeling...."
            value={poem}
            onChangeText={(poem) => {
              setPoem(poem);
            }}
          />
        </View>
      </ScrollView>
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
