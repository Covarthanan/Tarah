import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { CustomColors, CustomFontFamily } from "../styles/styles.component";
import { AppContext } from "../../service/context/context.component";

export const TextInfo = ({ text = "Andika_400Regular" }) => {
  return (
    <View style={styles.overview}>
      <Text style={styles.textview(text)}>Tarah</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    backgroundColor: CustomColors.bgcolor,
    width: 80,
    height: 30,
    borderWidth: 0.3,
    borderColor: "black",
    borderRadius: 5,
    margin: 2,
  },
  textview: (text) => ({
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 17,
    fontFamily: text,
  }),
});

export const TextFontList = [
  CustomFontFamily.second,
  CustomFontFamily.third,
  CustomFontFamily.fouth,
  CustomFontFamily.fifth,
  CustomFontFamily.six,
  CustomFontFamily.seven,
  CustomFontFamily.eight,
  CustomFontFamily.nine,
  CustomFontFamily.ten,
  CustomFontFamily.text11,
  CustomFontFamily.text12,
  CustomFontFamily.text13,
  CustomFontFamily.text14,
  CustomFontFamily.text15,
  CustomFontFamily.text16,
  CustomFontFamily.text17,
  CustomFontFamily.first,
  CustomFontFamily.text18,
  CustomFontFamily.text19,
  CustomFontFamily.text20,
  CustomFontFamily.text21,
  CustomFontFamily.text22,
  CustomFontFamily.text23,
  CustomFontFamily.text24,
  CustomFontFamily.text25,
  CustomFontFamily.text26,
];

export const TextListContainer = () => {
  const { SetTextFontContext, textFontContext } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        horizontal={true}
        data={TextFontList}
        renderItem={({ item }) => {
          //console.log("renderItem ", item);
          return (
            <TouchableOpacity
              onPress={() => {
                //console.log("old Font", textFontContext);
                // console.log("Selected Font", item);
                SetTextFontContext(item);
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
