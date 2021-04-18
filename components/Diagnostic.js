import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, FlatList, TextInput, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Footprint_Calculator from './assets/Footprint_Calculator';
import Modal from 'react-native-modal';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings"; //, {ActivityRingsData, ActivityRingsConfig}

export default class Diagnostic extends Component {
  state = {
      transportation: 0,
      waste: 0,
      utility: 0
   }
   handleCarTransportation = (number) => {
      this.setState({ transporation: car_transportation(number) })
   }
   handlePublicTransportation = (number) => {
      this.setState({ transporation: public_transportation(number) })
   }
   handleFlightTransportation = (number) => {
      this.setState({ transporation: flight_transportation(number) })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   render() {
      return (
         <View style = {styles.container}>
           <Text style={styles.titleText}>
             Welcome!
           </Text>
           <Text style={styles.mainText}>
             Ready to start living a sustainable lifestyle?
           </Text>
           <Text style={styles.titleText}>
             How many miles do you drive in your car?
           </Text>
           <Text style={styles.mainText}>
             "description"
           </Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Miles"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleCarTransportation}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
