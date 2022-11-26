import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Challenge() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [goal, setChallengeGoal] = useState("");
  const [vid_link, setChallengeVid] = useState("");
  const [period, setChallengePeriod] = useState("");

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    axios({
      url: "http://127.0.0.1:8080/api/challenge/",
      method: "GET",
    }).then((res) => {
      var response = res.data;
      setList(response);
      console.log(response);
    });
  };
  const handelVisibleModal = () => {
    setVisible(!visible);
  };

  const handelDelete = (item) => {
    axios({
      url: "http://127.0.0.1:8080/api/challenge/" + item._id + "/delete",
      method: "DELETE",
    }).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelUpdate = (item) => {
    axios({
      url: "http://127.0.0.1:8080/api/challenge/" + item._id + "/update",
      method: "PUT",
    }).then((res) => {
      var response = res.data;
      getList();
    });
  };
  const handelSave = () => {
    var data = {
      goal: goal,
      vid_link: vid_link,
      period: period,
    };
    axios({
      url: "http://127.0.0.1:8080/api/challenge/create",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getList();
      setChallengeGoal("");
      setChallengeVid("");
      setChallengePeriod("");
      setVisible(false);
    });
  };

  const onChangeGoal = (value) => {
    setChallengeGoal(value);
  };
  const onChangeVid = (value) => {
    setChallengeVid(value);
  };
  const onChangePeriod = (value) => {
    setChallengePeriod(value);
  };
  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text>Challenge</Text>
        <TouchableOpacity
          style={styles.text_input}
          onPress={handelVisibleModal}
        >
          <Text>New Challenge</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>
            <Text>Nouveau défi</Text>
            <Text>{goal},</Text>
            <Text>{vid_link},</Text>
            <Text>{period}.</Text>
            <TextInput
              value={goal}
              style={styles.text_input}
              placeholder="Goal"
              onChangeText={onChangeGoal}
            />
            <TextInput
              value={vid_link}
              style={styles.text_input}
              placeholder="vid_link"
              onChangeText={onChangeVid}
            />
            <TextInput
              value={period}
              style={styles.text_input}
              placeholder="period"
              onChangeText={onChangePeriod}
            />
            <TouchableOpacity onPress={handelSave}>
              <Text>Save new</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <View key={index}>
              <View>
                <Text>
                  {index + 1}. {item.goal}
                </Text>
                <Text>{item.vid_link}</Text>
                <Text>{item.period}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handelDelete(item)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelUpdate(item)}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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

  form: {
    padding: 15,
    // backgroundColor : "#е3е3e3",
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
  },
  header_container: {
    padding: 15,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
