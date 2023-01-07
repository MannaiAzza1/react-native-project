import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import {
  DrawerLayoutAndroid,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Challenge from "../components/challenge/challenge";
import Program from "../components/program/program";
import Event from "../components/event/event";
import Comp from "../components/comp/Comp";
import ChallengeAssign from "../components/challenge/challengeAssign";
import AddSession from "../components/session/addSession";
import Place from "./Place";
import Session from "./Session";
import React from "react";
import AuthService from "../../services/auth.service";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import InvitePlayer from "../components/player/invitePlayer";
import Stat from "../components/stat/stat";
import ProfilePlayer from "../components/player/playerProfile";
import UpdatePlayer from "../components/player/updatePlayer";

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => navigation.navigate("Login")} />
    </DrawerContentScrollView>
  );
}

export default function HomePagePLayer() {
  const Drawer = createDrawerNavigator();

  // 2. Use at the root of your app
  return (
    // <Drawer.Navigator initialRouteName="Home">
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
       <Drawer.Screen name="Profile" component={ProfilePlayer} />
       <Drawer.Screen headerShown={false} options={{headerMode: 'none', headerShown: false}} name="Update Profile" component={UpdatePlayer} />
      
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
});
