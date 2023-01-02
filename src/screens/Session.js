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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SessionService from "../../services/session.service";
import React, { cloneElement, useEffect, useState } from "react";
import { margin } from "styled-system";

export default function Place() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [name, setSessionName] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [player, setPlayer] = useState("");
  const [status, setStatus] = useState("");
  const [canceledReason, setCanceledReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [obj, setObj] = useState(false);
  const [hideId, setHideId] = useState(null);
  var radio_props = [
    {label: 'yes', value: true },
    {label: 'no', value: false }
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    SessionService.getAll().then((res) => {
      var response = res.data;
      setList(response?.data);
    });
  };
  const  handelVisibleModal = () => {
      setVisible(!visible); 
          setHideId(null);
  };
  const  handelVisibleModalCanceled = () => {
    setCancelModal(!cancelModal); 
};
const  handelVisibleModalFeedback = () => {
  setFeedbackModal(!feedbackModal); 
};

  const handelDelete = (item) => {
    SessionService.remove(item._id).then((res) => {
      var response = res.data;
      getList();
    });
  };

  const handelUpdate = (item) => {
    setVisible(true);
    setHideId(item._id);
    setSessionName(item.name);
    setDate(item.date);
    setPlace(item.place);
    setPlayer(item.player);
    setStatus(item.status);

    
  };

  const handelCanceled = (item) => {
    setCancelModal(true);
    setHideId(item._id);
    setSessionName(item.name);
    setDate(item.date);
    setPlace(item.place);
    setPlayer(item.player);
    setStatus(item.status);

    
  };
  const handelSubmitCanceled = () => {
    SessionService.updateCancel(hideId, {canceled_reason: canceledReason, status: "canceled"}).then(res => {handelVisibleModalCanceled();
    getList() })
  }

  const handleSubmitFeedback = () => {
    SessionService.updateFeedback(hideId, 
      {feedback, 
      obj_Is_Achieved: obj
      }).then(res => {
        handelVisibleModalFeedback();
        getList();
      })
  }

  const handelFeedback = (item) => {
    setFeedbackModal(true);
    setHideId(item._id);
    setSessionName(item.name);
    setDate(item.date);
    setPlace(item.place);
    setPlayer(item.player);
    setStatus(item.status);

    
  };
  const handelSave = () => {
    if (hideId == null) {
      var data = {
        name: name,
        date: date,
        place: place,
        status: status,
        player: player,
       
      };
      SessionService.create(data).then((res) => {
        getList();
        setSessionName("");
        setPlace("");
        setDate("");
        setVisible(false);
        setStatus("");
        setPlayer("");
        
      });
    } else {
      var data = {
        name: name,
        place: place,
        date: date,
        status: status,
        player: player,
       
      };
      SessionService.update(hideId, data).then((res) => {
        getList();
        setSessionName("");
        setPlace("");
        setDate("");
        setVisible(false);
        setStatus("");
        setPlayer("");
      });
    }
  };

  const onChangeName = (value) => {
    setSessionName(value);
  };
  const onChangePlace = (value) => {
    setPlace(value);
  };
 
  const onChangeDate = (value) => {
    setDate(value);
  };

  const onChangeStatus = (value) => {
    setStatus(value);
  };

  const onChangePlayer = (value) => {
    setPlayer(value);
  };

  const onChangeCanceledReason = (value) => {
    setCanceledReason(value);
  };

  const onChangeFeedback = (value) => {
    setFeedback(value);
  };

  const onChangeObj = (value) => {
    setObj(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.sessionTitle}>Session {list.length}</Text>
        <TouchableOpacity style={styles.btnNew} onPress={handelVisibleModal}>
          <Text style={styles.txtNew}>New Session</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModal}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>                                       
        
            <Text>New session</Text>
            <Text>{hideId}</Text>
            <Text>{name},</Text>
            <Text>{place},</Text>
            <Text>{date}.</Text>
            <Text>{status},</Text>
            <Text>{player}.</Text>
            <TextInput
              value={name}
              style={styles.text_input}
              placeholder="Name"
              onChangeText={onChangeName}
            />
            <TextInput
              value={place}
              style={styles.text_input}
              placeholder="place"
              onChangeText={onChangePlace}
            />
            <TextInput
              value={date}
              style={styles.text_input}
              placeholder="date"
              onChangeText={onChangeDate}
            />
             <TextInput
              value={status}
              style={styles.text_input}
              placeholder="status"
              onChangeText={onChangeStatus}
            />
           
             <TextInput
              value={player}
              style={styles.text_input}
              placeholder="Address"
              onChangeText={onChangePlayer}
            />
            <TouchableOpacity style={styles.btnSave} onPress={handelSave}>
              <Text style={styles.txtSave}>
                {hideId == null ? "save" : "update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <Modal animationType="slide" visible={cancelModal}>
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={handelVisibleModalCanceled}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>                                       
            <TextInput
              value={canceledReason}
              style={styles.text_input}
              placeholder="canceledReason"
              onChangeText={onChangeCanceledReason}
            />
        
            <TouchableOpacity style={styles.btnSave} onPress={handelSubmitCanceled}>
              <Text style={styles.txtSave}>
              update
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <Modal animationType="slide" visible={feedbackModal}>
        <SafeAreaView>
          <View style={styles.centered}>
            <TouchableOpacity onPress={handelVisibleModalFeedback}>
              <Text style={styles.txtClose}>close</Text>
            </TouchableOpacity>                                       
            <TextInput
              value={feedback}
              style={styles.text_input}
              placeholder="feedback"
              onChangeText={onChangeFeedback}
            
            />
            <Text>Objective is set:</Text>
         <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          labelHorizontal={true}
          initial={null}
          borderWidth={1}
          style={{ margin: 'auto'}}
          buttonInnerColor={'#e74c3c'}
          buttonWrapStyle={{ marginLeft: "auto",
          marginRight: "auto",}}
          onPress={(value) => {setObj(value)}}
        />
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmitFeedback}>
              <Text style={styles.txtSave}>
              submit
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
                  {index + 1}. {item?.name}
                </Text>
                <Text style={styles.txt_item}>{item?.name}</Text>
                <Text style={styles.txt_item}>{item?.date}</Text>
                <Text style={styles.txt_item}>{item?.place}</Text>
                <Text style={styles.txt_item}>{item?.player}</Text>
                <Text style={styles.txt_item}>{item?.status}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handelDelete(item)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelUpdate(item)}>
                  <Text style={styles.txt_edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelCanceled(item)}>
                  <Text style={styles.txt_edit}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelFeedback(item)}>
                  <Text style={styles.txt_edit}>feedback</Text>
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
    padding:10
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
  centered:{
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  }
});