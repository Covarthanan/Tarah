import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Button,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import * as Picker from "expo-image-picker";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../common/toast.message.component";

export const PickImage = async () => {
  let result = await Picker.launchImageLibraryAsync({
    mediaTypes: Picker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  // console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
    Uploadimage(result.uri)
      .then(() => {
        console.log("Profile Uploaded Successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const ImagePicker = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Picker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          let msg =
            "'Sorry, we need camera roll permissions to change profile'";
          ToastMessage(msg);
        }
      }
    })();
  }, []);

  const Uploadimage = async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    var ref = firebase.storage().ref().child("tarah/");
    return ref.put(blob);
  };

  const PickImage = async () => {
    let result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      Uploadimage(result.uri)
        .then(() => {
          console.log("Profile Uploaded Successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={PickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};
