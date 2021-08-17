import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppHeader } from "../../header/header.component";
import { CardInfo } from "../../card/cardinfo.component";
import { ImagePicker } from "../../imagepicker/imagepicker.component";
import { YourProfile } from "../../profile/yourprofile.component";
import { EditProfile } from "../../profile/editprofile.component";
import { BGColor } from "../../addpost/color.component";
import { TextListContainer } from "../../addpost/text.component";
import { Comments } from "../../feed/comments.component";
import * as firebase from "firebase";
import { CustomColors } from "../../styles/styles.component";
import { AddPost } from "../../addpost/addpost.component";
import LottieView from "lottie-react-native";
import { FollowInfo } from "../../profile/followlist.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateProfile } from "../../profile/createprofile.component";
import {
  Notification,
  schedulePushNotification,
} from "../../../service/notification/notification.component";

const APPNAME = "tarah";
let PATH = "";

export const HomeScreen = ({ navigation, route }) => {
  const [feedList, setFeedList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [myuserid, setMyUserId] = useState("");

  AsyncStorage.getItem("userid").then((value) => {
    if (value != null) {
      setMyUserId(value);
    }
  });

  const getFeed = () => {
    PATH = `${APPNAME}/Feed/`;
    firebase
      .database()
      .ref(PATH)
      .on("value", (snapshot) => {
        let responselist = Object.values(snapshot.val());
        setFeedList(responselist.reverse());
        setLoading(true);
      });
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <View>
      <AppHeader navigation={navigation} />

      {isLoading ? (
        <View style={{ marginBottom: 224 }}>
          {feedList.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              data={feedList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                // console.log("renderItem ", item);
                return (
                  <CardInfo
                    navigation={navigation}
                    card_detail={item}
                    from="home"
                    userid={myuserid}
                  />
                );
              }}
              keyExtractor={(item) => item.postid}
              style={{ margin: 1 }}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 280,
              }}
            >
              <Text style={{ textAlign: "center" }}>No post found😞</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator color={CustomColors.primary} size={55} />
        </View>
      )}

      {/* <YourProfile navigation={navigation} /> */}

      {/* <CreateProfile navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    alignContent: "center",
    alignSelf: "center",
    marginTop: 250,
  },
  scroll: {
    marginBottom: 113,
  },
});
