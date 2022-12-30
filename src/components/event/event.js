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
import EventService from "../../../services/event.services";
import React, { cloneElement, useEffect, useState } from "react";
export default function Event() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isPublic, setIsPublic] = useState("");
  const [details, setDetails] = useState("");
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    EventService.getAll().then((res) => {
      var response = res.data;
      console.log(response);
      setList(response.data);
      console.log(response);
    });
  };

  const handelVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const handelDelete = (item) => {
    EventService.remove(item._id).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelUpdate = (item) => {
    setVisible(true);
    setHideId(item._id);
    setIsPublic(item.isPublic);
    setDetails(item.details);
  };
  const handelSave = () => {
    if (hideId == null) {
      var data = {
        isPublic: isPublic,
        details: details,
      };
      EventService.create(data).then((res) => {
        getList();
        setIsPublic("");
        setDetails("");
        setVisible(false);
      });
    } else {
      var data = {
        isPublic: isPublic,
        details: details,
      };
      EventService.updateEvent(hideId, data).then((res) => {
        getList();
        setIsPublic("");
        setDetails("");
        setVisible(false);
      });
    }
  };

  const onChangeIsPublic = (value) => {
    setIsPublic(value);
  };
  const onChangeDetails = (value) => {
    setDetails(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.eventTitle}>Evenement {list.length}</Text>
        <TouchableOpacity style={styles.btnNew} onPress={handelVisibleModal}>
          <Text style={styles.txtNew}>New event</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>
            <Text>Nouveau Evenement</Text>
            <Text>{hideId}</Text>
            <Text>{isPublic}.</Text>
            <Text>{details},</Text>
            <TextInput
              value={isPublic}
              style={styles.text_input}
              placeholder="isPublic"
              onChangeText={onChangeIsPublic}
            />
            <TextInput
              value={details}
              style={styles.text_input}
              placeholder="Details"
              onChangeText={onChangeDetails}
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
            <View style={styles.item_event} key={index}>
              <View>
                <Text style={styles.txt_title}>{index + 1}.</Text>
                <Text style={styles.txt_item}>{item.isPublic}</Text>
                <Text style={styles.txt_item}>{item.details}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handelDelete(item)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelUpdate(item)}>
                  <Text style={styles.txt_edit}>Edit</Text>
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
  eventTitle: {
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
  item_event: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_title: {
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
