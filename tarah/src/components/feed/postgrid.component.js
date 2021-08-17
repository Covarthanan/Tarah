import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ColorInfo, ColorList } from "../addpost/color.component";
import { CardInfo } from "../card/cardinfo.component";

export const GridInfo = ({ post }) => {
  // console.log(post);
  // console.log("length", post.getPoem.length);
  return (
    <View>
      <View style={[styles.gridLayout(post.getBgColor)]}>
        {post.getPoem.length <= 43 && (
          <Text style={styles.textStyle(post.getTextColor, post.getTextFont)}>
            {post.getPoem}
          </Text>
        )}
        {post.getPoem.length > 43 && (
          <Text style={styles.textStyle(post.getTextColor, post.getTextFont)}>
            {post.getPoem.substring(0, 43)}....
          </Text>
        )}
      </View>
    </View>
  );
};

export const PostGrid = ({ navigation, PostList, from }) => {
  var PostArryList = [];
  let userid = "";
  AsyncStorage.getItem("userid").then((value) => {
    if (value !== null) {
      userid = value;
    }
  });

  if (PostList) {
    let keys = Object.keys(PostList);
    for (var i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];
      PostArryList[i] = PostList[key];
    }
  }

  return (
    <View style={{ marginLeft: 0.7, marginRight: 0.7 }}>
      <FlatList
        nestedScrollEnabled={true}
        numColumns={3}
        data={PostArryList.reverse()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item.postid);
                navigation.navigate("ViewPost", {
                  post: item,
                  from: from,
                  userid: userid,
                });
              }}
            >
              <GridInfo post={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.postid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridLayout: (bgcolor) => ({
    width: 130,
    height: 130,
    margin: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgcolor,
  }),
  textStyle: (textcolor, fontfamily) => ({
    textAlign: "center",
    margin: 8,
    padding: 10,
    color: textcolor,
    fontFamily: fontfamily,
    fontSize: 15,
  }),
});
