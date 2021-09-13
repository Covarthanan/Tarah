import React, { useContext } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AppContext } from "../../service/context/context.component";

export const ColorInfo = ({ color = "red" }) => {
  return <View style={styles.overview(color)}></View>;
};

const styles = StyleSheet.create({
  overview: (color) => ({
    backgroundColor: color,
    margin: 5,
    width: 40,
    height: 40,
    borderWidth: 0.3,
    borderColor: "black",
    borderRadius: 20,
  }),
});

export const ColorList = [
  "white",
  "#0b090a",
  "#a8dadc",
  "#457b9d",
  "#1d3557",
  "#e63946",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#f1faee",
  "#ae2012",
  "#9b2226",
  "#8338ec",
  "#3a86ff",
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
  "#008000",
  "#004b23",
  "#03045e",
  "#4b1d3f",
  "#7ae582",
  "#8367c7",
  "#008bf8",
  "#f2542d",
  "#ee6c4d",
  "#240046",
  "#9d4edd",
  "#a01a58",
  "#1780a1",
  "#ff7096",
  "#9ef01a",
  "#ff0a54",
  "#3e1f47",
  "#718355",
  "#1b4332",
];

export const BGColor = () => {
  const { bgColorContext, SetBgColorContext } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={ColorList}
        renderItem={({ item }) => {
          // console.log("renderItem ", item);
          return (
            <TouchableOpacity
              onPress={() => {
                //console.log("old BackgroundColor", bgColorContext);
                // console.log("Selected BgColor", item);
                SetBgColorContext(item);
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

export const TextColor = () => {
  const { textColorContext, SetTextColorContext } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={ColorList}
        renderItem={({ item }) => {
          // console.log("renderItem ", item);
          return (
            <TouchableOpacity
              onPress={() => {
                // console.log("old text color", textColorContext);
                // console.log("Selected Text Color", item);
                SetTextColorContext(item);
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
