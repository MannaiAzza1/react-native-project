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
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";

import { Dropdown } from "react-native-element-dropdown";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { useNavigation } from "@react-navigation/native";
import React, { cloneElement, useEffect, useState } from "react";
import { margin } from "styled-system";
import SessionService from "../../../services/session.service";
import PlaceService from "../../../services/place.service";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import PlayerService from "../../../services/player.service";
import ProgramService from "../../../services/program.services";
import AuthService from "../../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddSession({ route, navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [place, setPlace] = useState([]);
  const [placeSelected, setPlaceSelected] = useState(null);
  const [player, setPlayer] = useState([]);
  const [playerSelected, setPlayerSelected] = useState(null);
  const [program, setProgram] = useState([]);
  const [programSelected, setProgramSelected] = useState(null);
  const [session, setSession] = useState(null);
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    PlaceService.getAll().then((response) => {
      setPlace(response.data);
    });
  }, []);

  useEffect(() => {
    ProgramService.getAll().then((response) => {
      setProgram(response.data.data);
    });
  }, []);

  const fetchData = async () => {
    user = await AsyncStorage.getItem("userId");
    const players = await AuthService.getinvites(user);
    if (players) {
      console.log(players.data);
      setPlayer(players.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  const handelSave = async () => {
    user = await AsyncStorage.getItem("userId");
    var data = {
      name: name,
      place: placeSelected,
      program: programSelected,
      player: playerSelected,
      date: date,
      compToImprove: [],
      statsToAchieve: [],
      feedback: "",
      obj_Is_Achieved: false,
      canceled_reason: "",
    };
    SessionService.create(data)
      .then((response) => {
        newSession();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newSession = () => {
    setSession(null);
  };
  const onChangeName = (value) => {
    setName(value);
  };
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Session")}>
          <Text style={styles.txtClose}>close</Text>
        </TouchableOpacity>

        <Text>Nouvelle seance</Text>
        <TextInput
          value={name}
          style={styles.text_input}
          placeholder="Name"
          onChangeText={onChangeName}
        />
        <Text style={styles.label}>Date seance : </Text>
        <TouchableOpacity style={styles.btnDate}>
          <Button title="Choose Date" onPress={() => showDatePicker()}></Button>
        </TouchableOpacity>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
        <Text style={styles.label}>Place : </Text>
        <Picker
          style={styles.text_input}
          placeholder={place}
          selectedValue={placeSelected}
          onValueChange={(itemValue, itemIndex) => {
            setPlaceSelected(itemValue);
          }}
        >
          {place.map((item, index) => (
            <Picker.Item value={item} label={item.name} key={index} />
          ))}
        </Picker>
        <Text style={styles.label}>Program : </Text>
        <Picker
          style={styles.text_input}
          placeholder={program}
          selectedValue={programSelected}
          onValueChange={(itemValue, itemIndex) => {
            setProgramSelected(itemValue);
          }}
        >
          {program.map((item, index) => (
            <Picker.Item value={item} label={item.title} key={index} />
          ))}
        </Picker>
        <Text style={styles.label}>Player : </Text>
        <Picker
          style={styles.text_input}
          placeholder={player}
          selectedValue={playerSelected}
          onValueChange={(itemValue, itemIndex) => {
            setPlayerSelected(itemValue);
          }}
        >
          {player.map((item, index) => (
            <Picker.Item value={item.id} label={item.name} key={index} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.btnSave} onPress={handelSave}>
          <Text style={styles.txtSave}>save</Text>
        </TouchableOpacity>
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
    width: 350,
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
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  item_place: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  txtNew: {
    color: "white",
    padding: 10,
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
  centered: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  btndate: {
    padding: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "black",
  },
});
