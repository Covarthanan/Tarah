import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";

export const EditDeleteModel = () => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{ backgroundColor: "blue" }}
      >
        <View style={styles.centeredView}>
          <View style={styles.perviewModel}>
            <TouchableOpacity>
              <Text style={styles.modeltextStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modeltextStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 600,
  },
  perviewModel: {
    backgroundColor: "#242423",
    padding: 30,
    elevation: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  modeltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
    margin: 5.2,
    marginLeft: 10,
  },
});
