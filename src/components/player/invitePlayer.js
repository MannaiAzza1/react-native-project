import {useRef} from "react";
import { useState, useEffect } from "react";
import CompetenceService from "../../../services/comp-service";

import { List } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import NumericInput from 'react-native-numeric-input'

import {DrawerLayoutAndroid,TouchableOpacity ,ScrollView,Text, SafeAreaView,Alert,StyleSheet, View ,TextInput,Modal,Button} from "react-native";
import StatService from "../../../services/stat-service";
import AuthService from "../../../services/auth-service";
import { set } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Separator = () => (
  <View style={styles.separator} />
);

const InvitePlayer = () => {
  const drawer = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comp, setComp] = useState([]);
  const[ visible,setVisible] = useState(false)
  const [currentId,setCurrentId]=useState(null)

  const intialPlayer= {
    id: null,
    username:"",
    email:"",
    pasword:"",
    firstname:"",
    lastname:"",
};

const [CurrentPlayer,setCurrentPlayer]=useState(intialPlayer);
const [selectedVisible, setSelectedVisible] = useState(CurrentPlayer.isVisible);
const [username, setUsername] = useState(CurrentPlayer.username);
const [email, setEmail] = useState(CurrentPlayer.desc);
const [pasword, setPasword] = useState(CurrentPlayer.pasword);
const [firstname, setFirstname] = useState();
const [lastname, setLastname] = useState();
const navigation = useNavigation();
const handleVisibleModal = () => {
  setVisible(!visible);
  setCurrentId(null)
  setUsername("");
  setFirstname("");
  setPasword("");
  setEmail("")
  setSelectedVisible(false)
  setCurrentId(null)
  
  
  
};
const fetchData = async () => {
  user = await AsyncStorage.getItem('userId')   
  const comps = await AuthService.getinvites(user)
  if (comps) {
      console.log(comps.data)
      setComp(comps.data)
      
  }
 
};
  useEffect(() => {
    
    
    
    fetchData();
}, [comp]); 
const handleSave = async() => {
   user = await AsyncStorage.getItem('userId')  
   var data = {
    firstname: firstname,
    email: email,
    pasword: pasword,
    username: username,
    isVisible: selectedVisible,
    lastname:lastname,
   
    };
    console.log(user)
    console.log(data)
    if(currentId==null)
    { AuthService.invite(user,username,email,pasword,firstname,lastname).then((res) => {
      Alert.alert("Player has been successfully invited!")
      fetchData();
      setUsername("");
      setFirstname("");
      setPasword("");
      setLastname("")
      setEmail("")
      setSelectedVisible(false)
      setVisible(false);
    });
  }
  else
   {
    
     
  setCurrentId(null)
  setUsername("");
  setFirstname("");
  setPasword("");
  setEmail("");

  setLastname("")
  setSelectedVisible(false)
  setCurrentId(null)
        setVisible(false);
      
    }
   
   
  
  
  
};

const onChangeUsername = (value) => {
  setUsername(value);
  console.log(value)
};
const onChangeFirstname = (value) => {
  setFirstname(value);
  console.log(value)
};
const onChangePasword= (value) => {
  setPasword(value);
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
 
  


}
const handelDelete = (item) => {
  StatService.remove(item._id).then((res) => {
    fetchData();
  });
};







  return (
  
    
  <ScrollView backgroundColor="white">
    <Button
        title="Invite a player"
        onPress={() => handleVisibleModal()}
      />
         <Separator />
  <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
            <TextInput
              value={firstname}
              style={styles.text_input}
              placeholder="Firstname"
              onChangeText={onChangeFirstname}
            
            />
            <TextInput
              value={email}
              style={styles.desc_input}
              placeholder="Email"
              onChangeText={onChangeEmail}
             
             
              
            />
            <TextInput 
              value={lastname}
              style={styles.text_input}
              placeholder="Lastname"
              onChangeText={onChangeLastname}></TextInput>
           
             <TextInput
              value={username}
              style={styles.text_input}
              placeholder="Username"
              onChangeText={onChangeUsername}
              
        
              
            />
           
        

          
            <TouchableOpacity style={styles.btnSave} >
            <Button
        title="Invite" 
        onPress={() => handleSave()}
      />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
                     

    <ScrollView backgroundColor="white">
        {comp.map((item) => {
          return (
            <List.Item
            style={styles.card_input}
          
            title= {item.username}
            
            
            right={props=><Text><Button title="Edit" onPress={() => navigation.navigate("Update Profile",{data: item._id,})}>
              
          </Button>  </Text>}
          />
          );
        })}
      </ScrollView>
     </ScrollView> 
     
     
      
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
});

export default InvitePlayer;