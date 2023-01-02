import axios from "axios";
import React, { cloneElement, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = "http://192.168.1.6:8080/api/auth/";
const register = (data) => {
    return axios.post("http://192.168.1.61:8080/api/auth/signup/coach", data);
};
const invite = (id, username, email, password, firstname, lastname) => {
    return axios.post(API_URL + id + "/invite", {
        username,
        email,
        password,
        firstname,
        lastname,
    });
};
const getinvites = (id, data) => {
    return axios.get(`http://192.168.1.6/api/player/coach/` + id, data);
};
const acceptInvite = (id, data) => {
    return axios.put(`http://192.168.1.6/api/auth/confirm/${id}`, data);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
             storeData(response.data)         
            }
            
            return response.data;
        })};
const logout = () => {
    AsyncStorage.removeItem("user");
};

function getCurrentUser() {
  
   return null
};


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    invite,
    getData,
    getinvites,
    acceptInvite
};
export default AuthService;