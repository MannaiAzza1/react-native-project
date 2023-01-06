import { StatusBar } from "expo-status-bar";
import { useLocation } from "@react-navigation/native";
import MultiSelect from "react-native-multiple-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import ChallengeService from "../../../services/challenge.services";
import React, { cloneElement, useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../../../services/auth.service";
import PlayerService from "../../../services/player.service";
export default function ChallengeAssign({ route, navigation }) {
  const [user, setUser] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [item, setItems] = useState([]);
  const [period, setPeriod] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  let players = [];
  const challengeId = route.params.challengeId;

  useEffect(() => {
    AuthService.getData().then((r) => {
      let u = JSON.parse(r);
      u.invited_users.forEach((element) => {
        invitedUsers.push(element);
      });
      if (invitedUsers) {
        invitedUsers.forEach((e) => {
          PlayerService.fetchPlayer(e).then((res) => {
            item.push({ id: res._id, name: res.username });
          });
        });
      }
    });
  }, []);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);

    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = item.find((item) => item.id === selectedItems[i]);
    }
  };

  // const playerOptionsl = AuthService.getinvites(coach._id, coach).then(res => console.log(res));

  const onSubmit = () => {
    let data = {
      period,
      players: selectedItems,
    };
    ChallengeService.update(challengeId, data).then((res) =>
      setModalVisible(true)
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.buttonStyleX}>
        <View style={styles.dropdown}>
          <MultiSelect
            hideSubmitButton
            ref={(component) => {
              this.multiSelect = component;
            }}
            items={item}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Select Items"
            searchInputPlaceholderText="Search Items Here..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            hideTags={true}
            searchInputStyle={{ color: "#CCC" }}
          />

          <View>{this.multiSelect?.getSelectedItemsExt(selectedItems)}</View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>success</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.buttonStyle}>
          <View style={styles.text_input}>
            <Text> Period:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => setPeriod(e)}
            />
          </View>
          <Button
            style={{ fontSize: 20, color: "green" }}
            styleDisabled={{ color: "red" }}
            onPress={() => onSubmit()}
            title="SUBMIT"
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  challengeTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  form: {
    padding: 15,
    marginTop: 10,
  },
  txtClose: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right",
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  header_container: {
    padding: 10,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  challengeTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  buttonDesign: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  item_challenge: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_goal: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  txt_item: {
    fontSize: 16,
    marginTop: 5,
  },
  txt_del: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
    color: "red",
  },
  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
    color: "blue",
  },
  btnNew: {
    padding: 10,
    backgroundColor: "black",
    marginLeft: 10,
  },
  txtNew: {
    color: "white",
  },
  btnSave: {
    padding: 10,
    backgroundColor: "black",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtSave: {
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
