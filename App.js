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
import Challenge from './components/Challenge';
import Modal from 'react-native-modal';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings"; //, {ActivityRingsData, ActivityRingsConfig}

import { getNews } from './src/news';
import Articles from './src/components/Articles';
import Feed from './Feed';

import AppIntroSlider from 'react-native-app-intro-slider';

import { AppearanceProvider, Appearance } from "react-native-appearance";
import WalkthroughScreen from "./src/screens/WalkthroughScreen/WalkthroughScreen";
import WalkthroughAppConfig from "./src/WalkthroughAppConfig";
import DynamicAppStyles from "./src/DynamicAppStyles";

// import * as $ from "jquery";
// import Accomplishments from './Accomplishments';

// const express = require("express");
// const {spawn} = require("child_process");
// const app = express();




const fetchFonts = () => {
  return Font.loadAsync({
    'fredoka-one': require('./assets/fonts/FredokaOne-Regular.ttf'),
    'sacramento': require('./assets/fonts/Sacramento-Regular.ttf'),
    'assistant-bold': require('./assets/fonts/Assistant-Bold.ttf'),
    'assistant-semi': require('./assets/fonts/Assistant-SemiBold.ttf'),
    'assistant-light': require('./assets/fonts/Assistant-Light.ttf')
  });
};

// function footprint_calculator() {
//   var myPythonScriptPath = 'test.py';
//
//   var PythonShell = require('python-shell');
//   var pyshell = new PythonShell(myPythonScriptPath);
//   var options = {
//     mode: 'text'
//   }
//
//   PythonShell.run('test.py', options, function(err, results) {
//     if (err) throw err;
//     console.log('results: %j', results);
//   });
//
//   return (
//     null
//   );
// }

function NewsScreen({ navigation }) {
    // <Feed/>
    const [text, setName] = React.useState("Useless Text");
    const [number, setNumber] = React.useState(null);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          Welcome!
        </Text>
        <Text style={styles.mainText}>
          Ready to start living a sustainable lifestyle?
        </Text>
        <TextInput
          style={styles.titleText}
          placeholder="useless placeholder"
          onChangeText={(val) => setNumber(val)}
          value = {number}
        />
        <TextInput
          style={styles.titleText}
          placeholder="useless placeholder"
          onChangeText={(val) => setNumber(val)}
          value2 = {number}
        />
        // <Button
        //   title="Go to Tasks"
        //   onPress={() => ()}
        // />
      </View>
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

    const pressHandler = (key) => {
        setChallenges(prevChallenges => {
          return prevChallenges.filter(challenge => challenge.key != key);
        });
    };

    return (
      <View style={styles.container}>
        <Header />
          <View style={styles.list}>
              <FlatList contentInset= {{bottom: 80}}
                data={challenges}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => pressHandler(item.key)}>
                        <View style={styles.list}>
                            <Text style={styles.item}>
                            <Text style={styles.taskText}>
                              {"    "}
                              {item.text}
                              {"\n"}{"\n"}{"      "}
                            </Text>
                            <Image
                              style={styles.tinyLogo}
                              source={item.source}
                            />
                              <Text style={styles.mainText}>{"\n"}{item.modal}</Text>
                            </Text>
                        </View>
                  </TouchableOpacity>
                )}
              />
          </View>
      </View>
    );
}

function AccountScreen({ navigation }) {
  const activityData = [
  {
    label: "Transportation",
    value: 0.8,
    color: "#006400",
  },
  {
    label: "Waste",
    value: 0.6,
    color: "#69941c",
  },
  {
    label: "Utilities",
    value: 0.2,
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
      <ActivityRings theme={"light"} legend={true} data={activityData} config={activityConfig} />
      <Text style={styles.titleText}>

      </Text>
      <Text style={styles.mainText}>
        You're doing great!
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
         component={TasksScreen}
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

// export default class App extends Component {
//   // const [dataLoaded, setDataLoaded] = useState(false);
//
//   // const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
//
//   constructor(props) {
//     super(props);
//     this.state = {
//         show_Main_App: false
//     };
//   }
//
//   on_Done_all_slides = () => {
//     this.setState({ show_Main_App: true });
//   };
//   on_Skip_slides = () => {
//     this.setState({ show_Main_App: true });
//   };
//
//   // useEffect(() => {
//   //   Appearance.addChangeListener(({ colorScheme }) => {
//   //     setColorScheme(colorScheme);
//   //   });
//   // });
//
//   // if (!dataLoaded) {
//   //   return(
//   //     <AppLoading
//   //       startAsync={fetchFonts}
//   //       onFinish={() => setDataLoaded(true)}
//   //     />
//   //   )
//   // };
//
//   render() {
//     if (this.state.show_Main_App) {
//       return (
//         <NavigationContainer>
//             <MyTabs />
//         </NavigationContainer>
//         // <View style={styles.MainContainer}>
//         //   <Text style={{ textAlign: 'center', fontSize: 20, color: '#000' }}>
//         //       This is your main App screen After App Walkthrough.
//         //   </Text>
//         // </View>
//       );
//     }
//     else {
//       return (
//         <AppIntroSlider slides={slides} onDone={this.on_Done_all_slides}
//           showSkipButton={true}
//           onSkip={this.on_Skip_slides} />
//         // <AppearanceProvider>
//         //     <WalkthroughScreen
//         //       appConfig={WalkthroughAppConfig}
//         //       appStyles={DynamicAppStyles}
//         //     />
//         // </AppearanceProvider>
//         );
//     }
//   // }
//   }
// }



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

// const slides = [
//   {
//     key: 'k1',
//     title: 'Ecommerce Leader',
//     text: 'Best ecommerce in the world',
//     image: {
//       uri:
//         'https://i.imgur.com/jr6pfzM.png',
//     },
//     titleStyle: styles.title,
//     textStyle: styles.text,
//     imageStyle: styles.image,
//     backgroundColor: '#F7BB64',
//   },
//   {
//     key: 'k2',
//     title: 'fast delivery',
//     text: 'get your order insantly fast',
//     image: {
//       uri:
//         'https://i.imgur.com/au4H7Vt.png',
//     },
//     titleStyle: styles.title,
//     textStyle: styles.text,
//     imageStyle: styles.image,
//     backgroundColor: '#F4B1BA',
//   },
//   {
//     key: 'k3',
//     title: 'many store ',
//     text: 'Multiple store location',
//     image: {
//       uri: 'https://i.imgur.com/bXgn893.png',
//     },
//     titleStyle: styles.title,
//     textStyle: styles.text,
//     imageStyle: styles.image,
//     backgroundColor: '#4093D2',
//   },
//   {
//     key: 'k4',
//     title: '24 hours suport',
//     text: ' Get Support 24 Hours with Real Human',
//     image: {
//       uri: 'https://i.imgur.com/mFKL47j.png',
//     },
//     titleStyle: styles.title,
//     textStyle: styles.text,
//     imageStyle: styles.image,
//     backgroundColor: '#644EE2',
//   }
// ];
