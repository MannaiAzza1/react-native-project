import {useRef} from "react";
import { useState, useEffect } from "react";
import CompetenceService from "../../../services/comp-service";
import { List } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'


import {DrawerLayoutAndroid,TouchableOpacity ,ScrollView,Text, SafeAreaView,Alert,StyleSheet, View ,TextInput,Modal,Button} from "react-native";
import StatService from "../../../services/stat-service";





const Separator = () => (
  <View style={styles.separator} />
);

const Stat = () => {
  const drawer = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comp, setComp] = useState([]);
  const[ visible,setVisible] = useState(false)
  const[edit,setEdit] =useState(false)
  const [currentId,setCurrentId]=useState(null)

  const intialStat = {
    id: null,
    title: "",
    desc: "",
    type: "",
    unit: "",
    link: "",
    scale:"",
    isVisible: false,
};

const [CurrentStat,setCurrentStat]=useState(intialStat);
const [selectedVisible, setSelectedVisible] = useState(CurrentStat.isVisible);
const [link, setLink] = useState(CurrentStat.link);
const [desc, setDesc] = useState(CurrentStat.desc);
const [scale, setScale] = useState(CurrentStat.scale);
const [title, setTitle] = useState();
const [unit, setUnit] = useState();
const [type, setType] = useState();
const handleVisibleModal = () => {
  setVisible(!visible);
  setCurrentId(null)
  setLink("");
  setTitle("");
  setScale("");
  setDesc("")
  setSelectedVisible(false)
  setCurrentId(null)
  
  
  
};
const fetchData = async () => {
       
  const comps = await StatService.getAll()
  if (comps) {
      setComp(comps);
  }   
  
  
 
  
};
  useEffect(() => {
    
    
    
    
    fetchData();
}, []); 
const handleSave = async() => {
   var data = {
    title: title,
    desc: desc,
    scale: scale,
    link: link,
    isVisible: selectedVisible,
    unit:unit,
    type:type
    };
    console.log(data)
    if(currentId==null)
    { StatService.create(data).then((res) => {
      Alert.alert("Added Successfuly!")
      fetchData();
      setLink("");
      setTitle("");
      setScale("");
      setType("")
      setUnit("")
      setDesc("")
      setSelectedVisible(false)
      setVisible(false);
    });
  }
  else
   {
    
      StatService.update(currentId, data).then((res) => {
        Alert.alert("Updated Sucessfully")
        fetchData();
        setCurrentId(null)
  setLink("");
  setTitle("");
  setScale("");
  setDesc("");
  setType("")
  setUnit("")
  setSelectedVisible(false)
  setCurrentId(null)
        setVisible(false);
      });
    }
   
   
  
  
  
};

const onChangeLink = (value) => {
  setLink(value);
  console.log(value)
};
const onChangeTitle = (value) => {
  setTitle(value);
  console.log(value)
};
const onChangeScale= async (value) => {
  setScale(value);
  console.log(value)
  
};
const onChangeUnit = (value) => {
    setUnit(value);
    console.log(value)
  };
const onChangeDesc = (value) => {
  setDesc(value);
  console.log(value)
};const onChangeType = (value) => {
    setType(value);
    console.log(value)
  };
const handleEdit = (item) =>
{
  
  setCurrentId(item._id)
  setVisible(true)
  setLink(item.link)
  setSelectedVisible(item.isVisible)
  setScale(item.scale)
  setDesc(item.desc)
  setTitle(item.title)
  setType(item.type)
  setUnit(item.unit)
  


}
const handelDelete = (item) => {
 
  StatService.remove(item._id).then((res) => {
    fetchData();
  });
};







  return (
  
    
  <SafeAreaView backgroundColor="white">
    <Button
        title="Add new Statistiques"
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
              value={title}
              style={styles.text_input}
              placeholder="Title"
              onChangeText={onChangeTitle}
            
            />
            <TextInput
              value={desc}
              style={styles.desc_input}
              placeholder="Description"
              onChangeText={onChangeDesc}
             
             
              
            />
            <TextInput 
              value={unit}
              style={styles.text_input}
              placeholder="Unite Statistiques"
              onChangeText={onChangeUnit}></TextInput>
           
             <TextInput
              value={link}
              style={styles.text_input}
              placeholder="Lien Competence"
              onChangeText={onChangeLink}
              
        
              
            />
            <TextInput 
              value={type}
              style={styles.text_input}
              placeholder="Type Statistiques"
              onChangeText={onChangeType}></TextInput>
              <TextInput 
              value={scale}
              style={styles.text_input}
              placeholder="scale Statistiques"
              keyboardType="numeric"
              onChangeText={onChangeScale}></TextInput>
           

            <Picker
           style={styles.text_input}
           placeholder={CurrentStat.isVisible}
           selectedValue={selectedVisible}
       onValueChange={(itemValue, itemIndex) =>
    {setSelectedVisible(itemValue) 
    console.log(itemValue)
    }
  }>
  <Picker.Item label="Visible" value={true} />
  <Picker.Item label="Not Visible" value={false} />
</Picker>

          
            <TouchableOpacity style={styles.btnSave} >
            <Button
        title={currentId == null ? "Add" : "Update"}
        onPress={() => handleSave()}
      />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
                     

    <ScrollView backgroundColor="white">
        {comp.map((item, index) => {
          return (
            <List.Item
            style={styles.card_input}
          
            title= {item.title}
            description={item.desc}
            
            right={props=><Text><Button title="Edit" onPress={() => handleEdit(item)}>
              
          </Button> <Button title="Delete"  color ="#FA5A37" onPress={() => handelDelete(item)}>
              
              </Button> </Text>}
          />
          );
        })}
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

export default Stat;