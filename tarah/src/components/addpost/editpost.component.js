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

export const EditPost = ({ navigation, route }) => {
  const { details } = route.params;

  // console.log(route.params.details);

  const [isloading, setIsloading] = useState(true);
  const [textAlign, setTextAlign] = useState("left");
  const [textColor, setTextColor] = useState("black");
  const [textFont, setTextFont] = useState(CustomFontFamily.eight);
  const [textSize, setTextSize] = useState(15);
  const [bgColor, setBgColor] = useState("white");

  const getdetails = () => {
    let editdetails = {};
    return (editdetails = {
      getTextAlign: textAlign,
      getTextColor: textColor,
      getTextFont: textFont,
      getTextSize: textSize,
      getBgColor: bgColor,
    });
  };

  const TextColor = () => {
    return (
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={ColorList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // console.log("Selected Text Color", item);
                  setTextColor(item);
                }}
              >
                <ColorInfo color={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  const BGColor = () => {
    return (
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={ColorList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // console.log("Selected Bg Color", item);
                  setBgColor(item);
                }}
              >
                <ColorInfo color={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  const TextListContainer = () => {
    return (
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={TextFontList}
          renderItem={({ item }) => {
            //console.log("renderItem ", item);
            return (
              <TouchableOpacity
                onPress={() => {
                  //console.log("old Font", textFontContext);
                  // console.log("Selected Font", item);
                  setTextFont(item);
                }}
              >
                <TextInfo text={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  return (
    <SafeArea>
      <StatusBar style="auto" />
      <SectionEditProfile>
        <IconButton
          size={30}
          icon="arrow-left"
          onPress={() => {
            navigation.navigate("AddPost");
            console.log("Pressed Close");
          }}
        />
        <StyledEditProfile>Style & Color..🤩</StyledEditProfile>

        <SectionEnd>
          {isloading && (
            <IconButton
              size={30}
              icon="arrow-right"
              color={CustomColors.primary}
              onPress={() => {
                let obj = { ...details, ...getdetails() };
                // console.log(obj);
                navigation.navigate("NewPost", { editobject: obj });
                // console.log("Check Pressed arrow-right");
              }}
            />
          )}
        </SectionEnd>
      </SectionEditProfile>

      <ScrollView
        nestedScrollEnabled={true}
        style={{ marginBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.poemLayout(bgColor)}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.textTitle,
                styles.textStyle(textAlign, textColor, textFont, textSize + 10),
              ]}
            >
              {details.getTitle}
            </Text>
            <Text
              style={[
                styles.textPoem,
                styles.textStyle(textAlign, textColor, textFont, textSize),
              ]}
            >
              {`${details.getPoem}`}
            </Text>
            <Text
              style={[
                styles.textAuthor,
                styles.textStyle(textAlign, textColor, textFont, textSize + 5),
              ]}
            >
              @{details.getAuthor}
            </Text>
          </ScrollView>
        </View>

        <View>
          <View>
            <Text style={{ paddingTop: 2, paddingLeft: 10 }}>Text Align</Text>
            <View style={{ flexDirection: "row" }}>
              <IconButton
                size={30}
                icon="format-align-left"
                onPress={() => {
                  // console.log("Pressed Close format-align-left");
                  setTextAlign("left");
                }}
              />
              <IconButton
                size={30}
                icon="format-align-center"
                onPress={() => {
                  console.log("Pressed Close format-align-center");
                  setTextAlign("center");
                }}
              />
              <IconButton
                size={30}
                icon="format-align-justify"
                onPress={() => {
                  console.log("Pressed Close format-align-justify");
                  setTextAlign("justify");
                }}
              />
              <IconButton
                size={30}
                icon="format-align-right"
                onPress={() => {
                  console.log("Pressed Close format-align-right");
                  setTextAlign("right");
                }}
              />
            </View>
          </View>

          <View style={styles.spacing}>
            <Text style={{ padding: 2 }}>Text Size</Text>
            <Slider
              style={{ width: 380, height: 40, size: 54 }}
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor={CustomColors.primary}
              maximumTrackTintColor="gray"
              thumbTintColor={CustomColors.primary}
              value={textSize}
              onValueChange={(value) => {
                setTextSize(value);
              }}
            />
          </View>

          <View style={[styles.spacing]}>
            <Text style={{ padding: 2 }}>Text Color</Text>
            <TextColor />
          </View>

          <View style={styles.spacing}>
            <Text style={{ padding: 2 }}>Background Color</Text>
            <BGColor />
          </View>

          <View style={[styles.spacing, { marginBottom: 10 }]}>
            <Text style={{ padding: 2 }}>Fonts</Text>
            <TextListContainer />
          </View>
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
