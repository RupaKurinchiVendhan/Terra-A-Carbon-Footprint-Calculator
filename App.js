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
import Header from './components/Header';
import ChallengeList from './components/Challenge';
import Diagnostic from './components/Diagnostic';
import Footprint_Calculator from './components/assets/Footprint_Calculator';
import Modal from 'react-native-modal';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings";
import DynamicAppStyles from "./src/DynamicAppStyles";

var transportation = 0;
var waste = 0;
var utility = 0;

var max_transportation = 55;
var max_waste = 110;
var max_utility = 30;

const fetchFonts = () => {
  return Font.loadAsync({
    'fredoka-one': require('./assets/fonts/FredokaOne-Regular.ttf'),
    'sacramento': require('./assets/fonts/Sacramento-Regular.ttf'),
    'assistant-bold': require('./assets/fonts/Assistant-Bold.ttf'),
    'assistant-semi': require('./assets/fonts/Assistant-SemiBold.ttf'),
    'assistant-light': require('./assets/fonts/Assistant-Light.ttf')
  });
};

function updateVals({new_input}) {
  console.log(new_input)
   transportation = new_input.transportation
   waste = new_input.waste
   utility = new_input.utility
}

function DiagnosticTest({ navigation }) {
  return (
    <Diagnostic
      callback={updateVals}
    />
  );
}

function AccountScreen({ navigation }) {
  const activityData = [
  {
    label: "Transportation",
    value: transportation / max_transportation,
    color: "#006400",
  },
  {
    label: "Waste",
    value: waste / max_waste,
    color: "#69941c",
  },
  {
    label: "Utilities",
    value: utility / max_utility,
    color: "#9dc9d1",
    backgroundColor: "#cccccc"
  }
  ];

  const activityConfig = {
    width: 150,
    height: 150
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.mainText}>
        You're doing great! Keep up the good work.
      </Text>
      <Text style={styles.mainText}>

      </Text>
      <Text style={styles.mainText}>

      </Text>
      <ActivityRings theme={"light"} legend={true} data={activityData} config={activityConfig} />
      <Text style={styles.titleText}>

      </Text>
      <Button
        title="Go to Tasks"
        onPress={() => navigation.navigate('Tasks')}
      />
      <Text style={styles.mainText}>
        to continue working towards
      </Text>
      <Text style={styles.mainText}>
        lowering your carbon footprint!
      </Text>

    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }
  return (

    <Tab.Navigator
        initialRouteName="Footprint Calculator"
        activeColor="#f0edf6"
        inactiveColor="#9dc9d1"
        labelStyle={{
          fontSize: 20,
          fontFamily: 'sacramento',
        }}
        barStyle={{ backgroundColor: '#69941c' }}
      >
      <Tab.Screen
        name="Footprint Calcuator"
        component={DiagnosticTest}
        options={{
          tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> Calculator </Text>,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name = "foot-print" color = {color} size = {26} />
          ),
        }}
       />
       <Tab.Screen
         name="Tasks"
         component={ChallengeList}
         options={{
           tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> Tasks </Text>,
           tabBarIcon: ({color, size}) => (
             <MaterialCommunityIcons name = "format-list-checks" color = {color} size = {26}/>
           ),
         }}
       />
      <Tab.Screen
        name="Progress"
        component={AccountScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> My Progress </Text>,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name = "account-circle" color = {color} size = {26}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  };
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
   },
   title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
   },
   text: {
    color: '#fff',
    fontSize: 20,
   },
   image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 40,
  },
  mainText: {
    fontFamily: 'assistant-light',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  titleText: {
    fontFamily: 'assistant-bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: '#69941c',
  },
  taskText: {
    fontFamily: 'assistant-bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#69941c',
  },
  buttonText: {
    fontSize: 10,
    color: '#69941c',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    fontFamily: 'assistant-light',
    fontSize: 18,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  list: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    flex:1,
  }
});
