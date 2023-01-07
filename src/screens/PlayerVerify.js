import { useState, useEffect } from "react";

import {
  DrawerLayoutAndroid,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../../services/auth-service";
import { system } from "styled-system";

const Separator = () => <View style={styles.separator} />;
const createTwoButtonAlert = () =>
  Alert.alert("This code is False", "Try again", [
    {
      text: "Try again",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
  ]);

const VerifyCode = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState();

  const handleSave = async () => {
    const id = await AsyncStorage.getItem("userId");
    const code = await AsyncStorage.getItem("code");
    if (title.toLowerCase() == code.toLowerCase()) {
      var data = {
        status: "Accepted",
      };
      const result = await axios.put(
        `http://192.168.1.7:8080/api/player/${id}/update`,
        data
      );
      navigation.navigate("UpdatePlayer", { data: id });
    } else {
      createTwoButtonAlert();
    }
  };

  const onChangeTitle = (value) => {
    setTitle(value);
    console.log(value);
  };

  return (
    <SafeAreaView backgroundColor="white">
      <ScrollView backgroundColor="white">
        <Modal animationType="slide">
          <SafeAreaView>
            <View>
              <Separator />
              <Text>Welcome to SportTech</Text>
              <Text>
                Please Enter the confirmation code sent to your email{" "}
              </Text>
              <TextInput
                value={title}
                style={styles.text_input}
                placeholder="Code"
                onChangeText={onChangeTitle}
              />

              <TouchableOpacity style={styles.btnSave}>
                <Button title={"Confirm"} onPress={() => handleSave()} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginVertical: 20,
    marginRight: 10,
    textAlign: "right",
    color: "blue",
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
  desc_input: {
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  card_input: {
    padding: 23,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
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
  checkbox: {
    margin: 8,
  },
  btnSave: {
    padding: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtSave: {
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default VerifyCode;
