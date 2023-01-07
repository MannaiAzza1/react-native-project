import {useRef} from "react";
import { useState, useEffect } from "react";
import CompetenceService from "../../../services/comp-service";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'
import SelectMultiple from 'react-native-select-multiple'
import MultiSelect from 'react-native-multiple-select';

import { Appbar } from 'react-native-paper';
import { List } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'
import bcrypt from 'bcryptjs'
import { LogBox } from 'react-native';


import {DrawerLayoutAndroid,TouchableOpacity ,ScrollView,Text, SafeAreaView,Alert,StyleSheet, View ,TextInput,Modal,Button} from "react-native";
import StatService from "../../../services/stat-service";
import AuthService from "../../../services/auth-service";
import { set } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import PlayerService from "../../../services/player-service";
import { id } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";



const ProfilePlayer = ({route}) => {
const [player,setPlayer]=useState()
const [username, setUsername] = useState();
const [email, setEmail] = useState();
const [firstname, setFirstname] = useState();
const [lastname, setLastname] = useState();
const [sexe, setSexe] = useState();
const [etbs, setEtbs] = useState();
const [date, setDate] = useState(new Date())
const [poids, setPoids] = useState();
const [stats,setStats]=useState([]);
const [tel,setTel]=useState();
const [id , setId]=useState()
const Separator = () => (
  <View style={styles.separator} />)
  const navigation = useNavigation();
  const fetchData = async () => {
    const userId=  await AsyncStorage.getItem("userId")
    const user = await axios.get(`http://192.168.1.5:8080/api/player/${userId}`)
    setPlayer(user.data)
    handleEdit(user.data)

   
  };
  
    useEffect(async () =>{
    
      
      
    fetchData()  
  }, []); 
  
  const handleEdit = (item) =>
{
 
  setEtbs(item.etablissement)
  setUsername(item.username)
  setEmail(item.email)
  setFirstname(item.firstname)
  setLastname(item.lastname)
  setPoids(item.poids)
  setSexe(item.sexe)
  setStats(item.stats)
  setTel(item.tel)
  setDate(item.birthdate)
  setId(item._id)
}
 

  

  return (
    <><Button
      title="Invite a player"
      onPress={() => navigation.navigate("UpdatePlayer",{data: id,})} />
      <Separator />
      <ScrollView backgroundColor="white">
        <Text style={styles.label}>Username: {username}</Text>
        <Text style={styles.label}>Firstname: {firstname}</Text>
        <Text style={styles.label}>Lastname: {lastname}</Text>
        <Text style={styles.label}>Email : {email}</Text>
        <Text style={styles.label}> Etablissement: {etbs}</Text>
        <Text style={styles.label}>Birthdate : {date.toString()} </Text>
        <Text style={styles.label}>Sexe : {sexe} </Text>
        <Text style={styles.label}>id : {id} </Text>
        <Separator />
        <Text style={styles.label}>Statistiques : </Text>


        {stats.map((item) => {
          return (

            <ScrollView style={styles.card_input}>
              <Text>Title : {item.title} </Text>
              <Text>Description : {item.desc} </Text>
              <Text>Lien : {item.link} </Text>
              <Text>Type : {item.type} </Text>
              <Text>Unit : {item.unit} </Text>
              <Text>Scale : {item.scale} </Text>
            </ScrollView>

          );
        })}
      </ScrollView></>

          
          


       

      
      

     
      
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
  select: {
    
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

export default ProfilePlayer;