import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, FlatList } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import ChallengeList from './components/Challenge';
import Modal from 'react-native-modal';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings"; //, {ActivityRingsData, ActivityRingsConfig}

import { getNews } from './src/news';
import Articles from './src/components/Articles';
import Feed from './Feed';
// import Accomplishments from './Accomplishments';


const fetchFonts = () => {
  return Font.loadAsync({
    'fredoka-one': require('./assets/fonts/FredokaOne-Regular.ttf'),
    'sacramento': require('./assets/fonts/Sacramento-Regular.ttf'),
    'assistant-bold': require('./assets/fonts/Assistant-Bold.ttf'),
    'assistant-semi': require('./assets/fonts/Assistant-SemiBold.ttf'),
    'assistant-light': require('./assets/fonts/Assistant-Light.ttf')
  });
};


function NewsScreen({ navigation }) {
  return (
    <Feed/>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text style={styles.titleText}>
    //     Welcome!
    //   </Text>
    //   <Text style={styles.mainText}>
    //     Ready to start living a sustainable lifestyle?
    //   </Text>
    //   <Button
    //     title="Go to Tasks"
    //     onPress={() => navigation.navigate('Tasks')}
    //   />
    // </View>
  );
}

function TasksScreen() {


    const [challenges, setChallenges] = useState([
      {text: 'Eat on tiny plates to limit portion sizes and eliminate food waste.', modal: "A study performed by Roskilde University revealed that if the plate size is reduced by just 9%, the food waste can be reduced by over 25%. In other words, by reducing the size of the plate, you ensure that you don't over feed yourself or the trash bin!", source: require('./assets/plates.png'), key: 1},
      {text: 'Allow for more white space in your fridge.', modal: 'Oftentimes, we fill up our shopping carts so that we can fill up our fridge. Leaving white space in your refrigerator is a great way to limit food waste by making sure that you get a chance to eat everything you buy.', source: require('./assets/fridge.png'), key: 2},
      {text: 'Donate to a climate science organization.', modal: 'If you have the means to donate to climate change charities, consider contributing to research and raising awareness. Some high-imact, evidence-based, cost-effective organizations include The Coalition for Rainforest Nations, Clean Air Task Force, The Information Technology and Innovation Foundation, Rainforest Foundation US, Sandbag, and The Climate Emergency Fund.', source: require('./assets/donate.png'), key: 3},
      {text: 'Separate the bottle caps from your bottles when recycling.', modal: 'sdfljskdflskdjf', source: require('./assets/recycle.png'), key: 4},
      {text: 'Try to replace disposable containers with jars or bottles.', modal: 'sdfljskdflskdjf', source: require('./assets/jars.png'), key: 5},
      {text: 'Use your food waste as compost.', modal: 'sdfljskdflskdjf', source: require('./assets/compost.png'), key: 6},
      {text: 'Replace incandescent light bulbs with compact fluorescent bulbs (CFLs).', modal: 'sdfljskdflskdjf', source: require('./assets/bulbs.png'), key: 7},
      {text: 'Buy a reusable water bottle.', modal: 'sdfljskdflskdjf', source: require('./assets/bottle.png'), key: 8},
      {text: 'Eat locally-grown foods and produce.', modal: 'sdfljskdflskdjf', source: require('./assets/eat.png'), key: 9},
      {text: 'Try growing your own vegetables.', modal: 'sdfljskdflskdjf', source: require('./assets/produce.png'), key: 10},
      {text: "Donate clothes that you don't need and repurpose un-donatable ones.", modal: 'sdfljskdflskdjf', source: require('./assets/clothes.png'), key: 11},
      {text: 'Drink filtered tap water.', modal: 'sdfljskdflskdjf', source: require('./assets/water.png'), key: 12},
      {text: 'Only use 2-day shipping if you need the item immediately.', modal: 'sdfljskdflskdjf', source: require('./assets/shipping.png'), key: 13},
      {text: "If you can walk or bike there, don't drive.", modal: 'sdfljskdflskdjf', source: require('./assets/walk.png'), key: 14}
    ]);

    const renderItem = ({ item }) => {
      return (
        <Challenge
          item={item}
        />
      );
    };

    return (
      <View style={styles.container}>
        <Header />
          <View style={styles.list}>
              <FlatList
                contentInset= {{bottom: 80}}
                data={challenges}
                renderItem={renderItem}
              />
          </View>
      </View>
    );
}

function AccountScreen() {
  const activityData = [
  {
    label: "Transportation",
    value: 0.8,
    color: "#69941c",
  },
  {
    label: "Recyclying",
    value: 0.6,
    color: "#9dc9d1",
  },
  {
    label: "RINGS",
    value: 0.2,
    color: "#86040f",
    backgroundColor: "#cccccc"
  }
  ];

  const activityConfig = {
    width: 150,
    height: 150
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityRings legend={true} data={activityData} config={activityConfig} />
      <Text style={styles.titleText}>

      </Text>
      <Text style={styles.mainText}>
        Ready to start living a sustainable lifestyle?
      </Text>
      <Button
        title="Go to Tasks"
        onPress={() => navigation.navigate('Tasks')}
      />
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
        initialRouteName="News"
        activeColor="#f0edf6"
        inactiveColor="#9dc9d1"
        labelStyle={{
          fontSize: 20,
          fontFamily: 'sacramento',
        }}
        barStyle={{ backgroundColor: '#69941c' }}
      >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> News </Text>,
          // tabBarColor: '#69941c',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name = "newspaper" color = {color} size = {26} />
          ),
        }}
       />
       <Tab.Screen
         name="Tasks"
         component={ChallengeList}
         options={{
           tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> Tasks </Text>,
           // tabBarColor: '#9dc9d1',
           tabBarIcon: ({color, size}) => (
             <MaterialCommunityIcons name = "format-list-checks" color = {color} size = {26}/>
           ),
         }}
       />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 15, fontFamily: 'assistant-semi'}}> Account </Text>,
          // tabBarColor: '#9dc9d1',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name = "account-circle" color = {color} size = {26}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// function fonts() {
//   const [dataLoaded, setDataLoaded] = useState(false);
//
//   if (!dataLoaded) {
//     return(
//       <AppLoading
//         startAsync={fetchFonts}
//         onFinish={() => setDataLoaded(true)}
//       />
//     )
//   }
// }

export default function App() {
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
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    // alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
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
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderColor: '#9dc9d1',
    borderWidth: 3,
    // borderStyle: "dashed",
    borderRadius: 10,
    fontFamily: 'assistant-light',
    fontSize: 18,
    // alignItems: 'center',
    flex: 1,
    // justifyContent: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  list: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    flex:1,
  }
});
