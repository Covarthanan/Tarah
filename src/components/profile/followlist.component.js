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
import { Section, StyledCardComments } from "../card/cardstyle.component";
import { CustomFontFamily } from "../styles/styles.component";

export const FollowInfo = ({ navigation, list }) => {
  // console.log(post);
  // console.log("length", post.getPoem.length);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("YourProfile", { userid: list.userid });
      }}
    >
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "gray",
          margin: 2,
          borderRadius: 5,
        }}
      >
        <Section style={{ marginLeft: 5 }}>
          <Text
            style={{
              fontFamily: CustomFontFamily.seven,
              fontSize: 18,
              margin: 5,
              marginTop: 22,
            }}
          >
            {list.username}
          </Text>
        </Section>
        <Text style={{ margin: 5, marginLeft: 15 }}></Text>
      </View>
    </TouchableOpacity>
  );
};

export const FollowList = ({ navigation, List }) => {
  var FollowArryList = [];
  if (List) {
    let keys = Object.keys(List);
    for (var i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];
      FollowArryList[i] = List[key];
    }
  }

  console.log(FollowArryList);

  return (
    <View style={{ marginLeft: 0.7, marginRight: 0.7 }}>
      <FlatList
        nestedScrollEnabled={true}
        data={FollowArryList.reverse()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("Pressed");
              }}
            >
              <FollowInfo navigation={navigation} list={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.followid}
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
    color: textcolor,
    fontFamily: fontfamily,
    fontSize: 15,
  }),
});
