import {useRef} from "react";
import { useState, useEffect } from "react";
import CompetenceService from "../../../services/comp-service";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'

import { Appbar } from 'react-native-paper';
import { List } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'
import bcrypt from 'bcryptjs'


import {DrawerLayoutAndroid,TouchableOpacity ,ScrollView,Text, SafeAreaView,Alert,StyleSheet, View ,TextInput,Modal,Button} from "react-native";
import StatService from "../../../services/stat-service";
import AuthService from "../../../services/auth-service";
import { set } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import PlayerService from "../../../services/player-service";




const Separator = () => (
  <View style={styles.separator} />
);

const UpdatePlayer = () => {
  
  const drawer = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comp, setComp] = useState([]);
  const[ visible,setVisible] = useState(false)
  const [currentId,setCurrentId]=useState(null)
  const [open, setOpen] = useState(false)


  const [datePicker, setDatePicker] = useState(false);
 
  
 




function showDatePicker() {
  setDatePicker(true);
};

function onDateSelected(event, value) {
  setDate(value);
  console.log(date)
  setDatePicker(false);
};


 

const [CurrentPlayer,setCurrentPlayer]=useState();
const [username, setUsername] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [firstname, setFirstname] = useState();
const [lastname, setLastname] = useState();
const [sexe, setSexe] = useState();
const [date, setDate] = useState(new Date())
const [poids, setPoids] = useState()

const fetchData = async () => {
  const user = await AsyncStorage.getItem('userId')   
  const player = await axios.get(`http://192.168.1.5:8080/api/player/${user}`)
  handleEdit(player.data)
 
};
  useEffect(() => {

   
    fetchData();
    console.log(CurrentPlayer)
    
}, []); 
const handleSave = async() => {
  const user = await AsyncStorage.getItem('userId') 
 
   
   var data = {
    firstname: firstname,
    email: email,
    password: password,
    username: username,
    lastname:lastname,
    birthdate:date.toString(),
    poids:poids
   
    };

    console.log(data)
    PlayerService.update(user,data)
          .then(response => {
          
            console.log("sucess");
            
          });

   
  
  
  
};

const onChangeUsername = (value) => {
  setUsername(value);
  console.log(value)
};
const onChangeFirstname = (value) => {
  setFirstname(value);
  console.log(value)
};
const onChangePassword= (value) => {
  setPassword(value);
  console.log(value)
};
const onChangeLastname = (value) => {
    setLastname(value);
    console.log(value)
  };
const onChangeEmail = (value) => {
  setEmail(value);
  console.log(value)
}
const handleEdit = (item) =>
{

  setUsername(item.username)
  setEmail(item.email)
  setFirstname(item.firstname)
  setLastname(item.lastname)
  


}








  return (
    <><Appbar.Header>
      <Appbar.Content title="Inscription"  />
    </Appbar.Header>
    <SafeAreaView backgroundColor="white">
        <ScrollView>







          <Text style={styles.label}>Firstname : </Text>
          <TextInput
            value={firstname}
            style={styles.text_input}
            placeholder="Firstname"
            onChangeText={onChangeFirstname} />
          <Text style={styles.label}>Email : </Text>
          <TextInput
            value={email}
            style={styles.desc_input}
            placeholder="Email"
            onChangeText={onChangeEmail} />
          <Text style={styles.label}>Last Name : </Text>
          <TextInput
            value={lastname}
            style={styles.text_input}
            placeholder="Lastname"
            onChangeText={onChangeLastname}></TextInput>
          <Text style={styles.label}>Username : </Text>

          <TextInput
            value={username}
            style={styles.text_input}
            placeholder="Username"
            onChangeText={onChangeUsername} />
          <Text style={styles.label}>Password : </Text>
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.text_input}
            placeholder="Password"
            onChangeText={onChangePassword} />
            <Text style={styles.label}>Sexe : </Text>
          <Picker
            style={styles.text_input}
            placeholder={sexe}
            selectedValue={sexe}
            onValueChange={(itemValue, itemIndex) => {
              setSexe(itemValue);
              console.log(itemValue);
            } }>
            <Picker.Item label="Femme" value="femme" />
            <Picker.Item label="Homme" value="homme" />
          </Picker>
          <Text style={styles.label}>Birthdate : </Text>
          <TouchableOpacity style={styles.btnSave}>
          <Button title="Choose Date"
              onPress={() => showDatePicker()}></Button>
              </TouchableOpacity>
          {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
        <Text style={styles.label}>Poids : </Text>
        <NumericInput 
        value={poids} 
        totalWidth={90} 
        totalHeight={50}
        containerStyle={styles.text_input}


onChange={value => setPoids(value)} />
          <TouchableOpacity style={styles.btnSave}>
            <Button
              title="Update"
              onPress={() => handleSave()} />
          </TouchableOpacity>
          <Text style={styles.label}>Birthdate : </Text>
          <Text style={styles.label}>Birthdate : </Text>
          <Text style={styles.label}>Birthdate : </Text>
          
          


        </ScrollView>

      </SafeAreaView></> 
      

     
      
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
    marginRight:10,
    textAlign: "right",
    color:"blue"
    
  },
   datePickerStyle: {
    width: 230,
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
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    
    
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default UpdatePlayer;