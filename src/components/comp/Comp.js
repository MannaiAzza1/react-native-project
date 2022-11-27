import {useRef} from "react";
import { useState, useEffect } from "react";
import CompetenceService from "../../../services/comp-service";
import { List } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'

import {DrawerLayoutAndroid,TouchableOpacity ,ScrollView,Text, SafeAreaView,Alert,StyleSheet, View ,TextInput,Modal,Button} from "react-native";


const Separator = () => (
  <View style={styles.separator} />
);

const Comp = () => {
  const drawer = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comp, setComp] = useState([]);
  const[ visible,setVisible] = useState(false)
  const handleVisibleModal = () => {
    setVisible(!visible);
  };
  const initialComp = {
    id: null,
    title: "",
    desc: "",
    type: "",
    nb_stars: 0,
    link: "",
    isVisible: false,
};

const [CurrentComp,setCurrentComp]=useState(initialComp);
const [selectedVisible, setSelectedVisible] = useState();
const [type, setType] = useState();
const [link, setLink] = useState();
const [desc, setDesc] = useState();
const [nbstars, setNbstars] = useState();
const [title, setTitle] = useState();


  useEffect(() => {
    
    
    const fetchData = async () => {
       
     
     
        const comps = await CompetenceService.FetchCompetences();
        if (comps) {
            setComp(comps);
            console.log(comps)
            console.log
           
        }   
        
        
       
        
    };
    fetchData();
}, []); 






  return (
  
    
  <SafeAreaView backgroundColor="white">
    <Button
        title="Add new competence"
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
              value={CurrentComp.title}
              style={styles.text_input}
              placeholder="Title "
            
            />
            <TextInput
              value={CurrentComp.desc}
              style={styles.desc_input}
              placeholder="Description"
             
             
              
            />
            
           <TextInput
              value={CurrentComp.type}
              style={styles.text_input}
              placeholder="Type competence"
              
        
              
            />
             <TextInput
              value={CurrentComp.link}
              style={styles.text_input}
              placeholder="Lien Competence"
              onChange={(itemValue, itemIndex) =>
                {
                console.log(itemValue)
                }}
              
        
              
            />
            <Picker
           style={styles.text_input}
           placeholder={CurrentComp.isVisible}
           selectedValue={selectedVisible}
       onValueChange={(itemValue, itemIndex) =>
    {SetSelectedVisible(itemValue) 
    console.log(itemValue)
    }
  }>
  <Picker.Item label="Visible" value={true} />
  <Picker.Item label="Not Visible" value={false} />
</Picker>
<NumericInput 
value={CurrentComp.nb_stars} 
totalWidth={90} 
totalHeight={50}
containerStyle={styles.text_input}

onChange={value => console.log(value)} />
          
            <TouchableOpacity style={styles.btnSave} >
            <Button
        title="Add"
        onPress={() => handleVisibleModal()}
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
          //   right={props=><Button icon="delete" onPress={() => console.log(item._id)}>
          // </Button> }
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

export default Comp;