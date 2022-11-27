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
import placeService from '../../services/place.service'
import React, { cloneElement, useEffect, useState } from "react";
import PlaceService from "../../services/place.service";
export default function Place() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setPlaceName] = useState("");
  const [town, setPlaceTown] = useState("");
  const [country, setPlaceCountry] = useState("");
  const [address, setPlaceAddress] = useState("");
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    placeService.getAll().then((res) => {
      var response = res.data;
      setList(response);
      console.log(response);
    });
  };
  const handelVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const handelDelete = (item) => {
    placeService.remove(item._id).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelUpdate = (item) => {
    setVisible(true);
    setHideId(item._id);
    setPlaceName(item.name);
    setPlaceTown(item.town);
    setPlaceCountry(item.country);
    setPlaceAddress(item.address);
  };
  const handelSave = () => {
    if (hideId == null) {
      var data = {
        name: name,
        town: town,
        country: country,
        address: address,
      };
      PlaceService.create(data).then((res) => {
        getList();
        setPlaceName("");
        setPlaceTown("");
        setPlaceCountry("");
        setPlaceAddress("");
        setVisible(false);
      });
    } else {
      var data = {
        name: name,
        town: town,
        country: country,
        address: address,
      };
      PlaceService.update(hideId, data).then((res) => {
        getList();
        setPlaceName("");
        setPlaceTown("");
        setPlaceCountry("");
        setPlaceAddress("");
        setVisible(false);
      });
    }
  };

  const onChangeName = (value) => {
    setPlaceName(value);
  };
  const onChangeTown = (value) => {
    setPlaceTown(value);
  };
  const onChangeCountry = (value) => {
    setPlaceCountry(value);
  };
  const onChangeAddress = (value) => {
    setPlaceAddress(value);
  };
  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.placeTitle}>Place {list.length}</Text>
        <TouchableOpacity style={styles.btnNew} onPress={handelVisibleModal}>
          <Text style={styles.txtNew}>New Place</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>
            <Text>New place</Text>
            <Text>{hideId}</Text>
            <Text>{name},</Text>
            <Text>{town},</Text>
            <Text>{country}.</Text>
            <Text>{address}.</Text>
            <TextInput
              value={name}
              style={styles.text_input}
              placeholder="Name"
              onChangeText={onChangeName}
            />
            <TextInput
              value={town}
              style={styles.text_input}
              placeholder="Town"
              onChangeText={onChangeTown}
            />
            <TextInput
              value={country}
              style={styles.text_input}
              placeholder="Country"
              onChangeText={onChangeCountry}
            />
             <TextInput
              value={address}
              style={styles.text_input}
              placeholder="Address"
              onChangeText={onChangeAddress}
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
            <View style={styles.item_place} key={index}>
              <View>
                <Text style={styles.txt_name}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={styles.txt_item}>{item.town}</Text>
                <Text style={styles.txt_item}>{item.country}</Text>
                <Text style={styles.txt_item}>{item.address}</Text>
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
  placeTitle: {
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
  placeTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  item_place: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_name: {
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