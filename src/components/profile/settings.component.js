import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { IconButton, Checkbox } from "react-native-paper";
import {
  Section,
  SectionEditProfile,
  SectionEnd,
  StyledCardComments,
  StyledEditProfile,
} from "../card/cardstyle.component";
import { PostGrid } from "../feed/postgrid.component";
import { SafeArea } from "../styles/safe.area.component";
import * as firebase from "firebase";
import { CustomFontFamily } from "../styles/styles.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../common/toast.message.component";

const APPNAME = "tarah";
let PATH = "";

export const Settings = ({ navigation, route }) => {
  const { userid } = route.params;
  const { details } = route.params;

  const [isLogoutModel, setIsLogoutModel] = useState(false);

  return (
    <SafeArea>
      <View>
        <SectionEditProfile>
          <IconButton
            size={30}
            icon="arrow-left"
            onPress={() => {
              navigation.navigate("YourProfile");
            }}
          />
          <StyledEditProfile>Settings</StyledEditProfile>
        </SectionEditProfile>
      </View>
      <View>
        <Section>
          <IconButton icon="account-edit" size={30} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile", { details: details });
            }}
          >
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
        </Section>
      </View>

      <View>
        <Section>
          <IconButton icon="logout" size={30} />
          <TouchableOpacity
            onPress={() => {
              setIsLogoutModel(true);
            }}
          >
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </Section>
      </View>
      <View>
        <Section>
          <IconButton icon="information" size={30} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("About");
            }}
          >
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
        </Section>
      </View>

      <View style={{ backgroundColor: "red" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isLogoutModel}
          onRequestClose={() => {
            null;
          }}
          style={{ color: "blue" }}
        >
          <View style={styles.centeredViewEDModal} onPress={() => {}}>
            <View style={styles.perviewEDModal}>
              <Text style={styles.modeltextStyleEDModal("white")}>
                Log out of Tarah?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 90,
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsLogoutModel(false);
                    AsyncStorage.setItem("userid", "");
                    AsyncStorage.setItem("username", "");
                    navigation.navigate("Home");
                    ToastMessage("You have successfully logged out.");
                  }}
                >
                  <Text style={styles.modeltextStyleEDModal("steelblue")}>
                    Logout
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsLogoutModel(false);
                  }}
                >
                  <Text style={styles.modeltextStyleEDModal("white")}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontSize: 18,
    fontFamily: CustomFontFamily.six,
  },
  centeredViewEDModal: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  perviewEDModal: {
    backgroundColor: "#242423",
    padding: 30,
    elevation: 5,
    borderRadius: 10,
    margin: 40,
  },
  modeltextStyleEDModal: (color) => ({
    color: color,
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
    margin: 5.2,
    marginLeft: 10,
  }),
});
