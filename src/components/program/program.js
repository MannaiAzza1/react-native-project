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
import ProgramService from "../../services/program.services";
import React, { cloneElement, useEffect, useState } from "react";
export default function Program() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [vid_link, setVid] = useState("");
  const [image, setImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    ProgramService.getAll().then((res) => {
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
    ProgramService.remove(item._id).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelUpdate = (item) => {
    setVisible(true);
    setHideId(item._id);
    setTitle(item.title);
    setVid(item.vid_link);
    setDesc(item.Desc);
    setImage(item.image);
  };
  const handelSave = () => {
    if (hideId == null) {
      var data = {
        title: title,
        Desc: Desc,
        vid_link: vid_link,
        image: image,
      };
      ProgramService.create(data).then((res) => {
        getList();
        setTitle("");
        setVid("");
        setDesc("");
        setImage("");
        setVisible(false);
      });
    } else {
      var data = {
        title: title,
        Desc: Desc,
        vid_link: vid_link,
        image: image,
      };
      ProgramService.updateProgram(hideId, data).then((res) => {
        getList();
        setTitle("");
        setVid("");
        setDesc("");
        setImage("");
        setVisible(false);
      });
    }
  };

  const onChangeTitle = (value) => {
    setTitle(value);
  };
  const onChangeVid = (value) => {
    setVid(value);
  };
  const onChangeDesc = (value) => {
    setDesc(value);
  };
  const onChangeImage = (value) => {
    setImage(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.programTitle}>Programme {list.length}</Text>
        <TouchableOpacity style={styles.btnNew} onPress={handelVisibleModal}>
          <Text style={styles.txtNew}>New Program</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>
            <Text>Nouveau Programme</Text>
            <Text>{hideId}</Text>
            <Text>{title}.</Text>
            <Text>{Desc},</Text>
            <Text>{vid_link},</Text>
            <Text>{image}.</Text>
            <TextInput
              value={title}
              style={styles.text_input}
              placeholder="Title"
              onChangeText={onChangeTitle}
            />
            <TextInput
              value={vid_link}
              style={styles.text_input}
              placeholder="vid_link"
              onChangeText={onChangeVid}
            />
            <TextInput
              value={Desc}
              style={styles.text_input}
              placeholder="Description"
              onChangeText={onChangeDesc}
            />
            <TextInput
              value={image}
              style={styles.text_input}
              placeholder="Image"
              onChangeText={onChangeImage}
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
            <View style={styles.item_program} key={index}>
              <View>
                <Text style={styles.txt_title}>
                  {index + 1}. {item.title}
                </Text>
                <Text style={styles.txt_item}>{item.vid_link}</Text>
                <Text style={styles.txt_item}>{item.Desc}</Text>
                <Text style={styles.txt_item}>{item.image}</Text>
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
  programTitle: {
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
  item_program: {
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
