import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

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
import ChallengeService from "../../../services/challenge.services";
import React, { cloneElement, useEffect, useState } from "react";
import axios from "axios";
export default function Challenge() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [goal, setChallengeGoal] = useState("");
  const [vid_link, setChallengeVid] = useState("");
  const [period, setChallengePeriod] = useState("");
  const [hideId, setHideId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    ChallengeService.getAll().then((res) => {
      var response = res.data;
      setList(response);
    });
  };
  const handelVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const handelDelete = (item) => {
    ChallengeService.remove(item._id).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelAssign = (item) => {
    ChallengeService.assign(item._id,item.data).then((res) => {
      var response = res.data;
      getList();
    });
  };



  const handelUpdate = (item) => {
    setVisible(true);
    setHideId(item._id);
    setChallengeGoal(item.goal);
    setChallengeVid(item.vid_link);
    setChallengePeriod(item.period);
  };
  const handelSave = () => {
    if (hideId == null) {
      var data = {
        goal: goal,
        vid_link: vid_link,
        period: period,
      };
      ChallengeService.create(data).then((res) => {
        getList();
        setChallengeGoal("");
        setChallengeVid("");
        setChallengePeriod("");
        setVisible(false);
      });
    } else {
      var data = {
        goal: goal,
        vid_link: vid_link,
        period: period,
      };
      ChallengeService.update(hideId, data).then((res) => {
        getList();
        setChallengeGoal("");
        setChallengeVid("");
        setChallengePeriod("");
        setVisible(false);
      });
    }
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
        <Text style={styles.challengeTitle}>Challenge {list.length}</Text>
        <TouchableOpacity style={styles.btnNew} onPress={handelVisibleModal}>
          <Text style={styles.txtNew}>New Challenge</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>
            <Text>Nouveau défi</Text>
            <Text>{hideId}</Text>
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
            <TouchableOpacity style={styles.btnSave} onPress={handelSave}>
              <Text style={styles.txtSave}>
                {hideId == null ? "save" : "update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <View style={styles.item_challenge} key={index}>
              <View>
                <Text style={styles.txt_goal}>
                  {index + 1}. {item.goal}
                </Text>
                <Text style={styles.txt_item}>{item.vid_link}</Text>
                <Text style={styles.txt_item}>{item.period}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handelDelete(item)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelUpdate(item)}>
                  <Text style={styles.txt_edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity  label="Assign" onPress={() => navigation.navigate("ChallengeAssign", { challengeId: item._id })} >
                  <Text style={styles.txt_del}>Assign</Text>
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
});
