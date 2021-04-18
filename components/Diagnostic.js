import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { CheckBox } from 'react-native-elements';
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Slider, StyleSheet, TouchableOpacity, Text, View, Button, FlatList, TextInput, SafeAreaView, ScrollView, Animated } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Footprint_Calculator from './assets/Footprint_Calculator';
import Modal from 'react-native-modal';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings"; //, {ActivityRingsData, ActivityRingsConfig}


var transportation_score = 0;
var waste_score = 0;
var utility_score = 0;
// var transportation_score = transportation(list.slice(0,3));
// var waste_score = waste(list.slice(3,9));
// var utility_score = utility(list.slice(9,12));

// calculate results
// var total_score = transportation_score + waste_score + utility_score;
// var max_total = max_transportation + max_waste + max_utility;
// tiers = tier(tiers);

// Personal/public/flights and miles per year
function car_transportation(car) {
    // var transportation_score = 0;

    // miles of car usage per year
    if (car > 15000) {
        transportation_score += 15;
    }
    else if (car > 10000) {
        transportation_score += 10;
    }
    else if (car > 1000) {
        transportation_score += 6;
    }
    else if (car > 0) {
        transportation_score += 4;
    }

    return transportation_score;
}

function public_transportation(buses) {
    // miles of public transportation usage per year
    if (buses > 20000) {
        transportation_score += 20;
    }
    else if (buses > 15000) {
        transportation_score += 10;
    }
    else if (buses > 10000) {
        transportation_score += 6;
    }
    else if (buses > 1000) {
        transportation_score += 4;
    }
    else if (buses > 0) {
        transportation_score += 2;
    }
    return transportation_score;
}

function flight_transportation(flight) {
    // flight distance per year
    if (flight == 0) {
        transportation_score += 2;
    }
    else if (flight == 1) {
        transportation_score += 6;
    }
    else if (flight == 2) {
        transportation_score += 20;
    }
    return transportation_score;
}

function get_transportation() {
    return '%.2f'%(transportation_score / max_transportation);
}

flight_options = [
  {id:0, choice: 'Never or rarely'},
  {id:1, choice: 'Short distances (within state)'},
  {id:2, choice: 'Further distances (nearby state or country)'},
  {id:3, choice: 'Far (another continent)'},
]
function MultipleSelect({options, callback}) {
  const [selected, setSelected] = useState(0);
  return (
    <View>
      {options.map((answer) => (
        <CheckBox
          center
          key={answer.id}
          title={answer.choice}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={answer.id == selected}
          onPress={() => {setSelected(answer.id); callback(answer.choice)}}
         />
        ))}
    </View>
  )
}
class TranspoDiagnostic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_mileage: 0,
      public_trans_mileage: 0,
      flight_mileage: 0
    };
  }

  updateFlight = (idx) => {
    this.setState({flight_mileage: idx})
  }

  render () {

    return (
      <View>
        <Text style={styles.header}>
          Transportation
        </Text>
        <Text style={styles.question}>
          How many miles do you drive per year?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100000}
         value={this.state.car_mileage}
         onValueChange={val => this.setState({ car_mileage: val })}
        />
        <Text style={styles.response}>
          {(Math.round(this.state.car_mileage/1000)*1000).toLocaleString(undefined, {minimumFractionDigits:0})} miles
        </Text>
        <Text style={styles.question}>
          How many miles of public transportation?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100000}
         value={this.state.public_trans_mileage}
         onValueChange={val => this.setState({ public_trans_mileage: val })}
        />
        <Text style={styles.response}>
          {(Math.round(this.state.public_trans_mileage/1000)*1000).toLocaleString(undefined, {minimumFractionDigits:0})} miles
        </Text>
        <Text style={styles.question}>
          How far do you usually fly?
        </Text>
        <MultipleSelect
          options={flight_options}
          callback={this.updateFlight}
        />
      </View>
    )
  }
}
export default class Diagnostic extends Component {


  state = {
      transportation: 0,
      waste: 0,
      utility: 0,
      car_transportation: 0
   }
   handleCarTransportation = (number) => {
     var car_t = car_transportation(number);
      this.setState({ transporation: car_t})
      // console.log(car_t);
   }
   handlePublicTransportation = (number) => {
      this.setState({ transporation: public_transportation(number) })
   }
   handleFlightTransportation = (number) => {
      this.setState({ transporation: flight_transportation(number) })
   }
   render() {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.titleText}>
              Welcome!
            </Text>
            <Text style={styles.mainText}>
              Ready to start living a sustainable lifestyle?
            </Text>
            <Text style={styles.mainText}>
              Let's start by answering a few questions.
            </Text>
            <TranspoDiagnostic/>

          </ScrollView>
        </SafeAreaView>

      )
   }
}

 // <View style = {styles.container}>
 //   <Text style={styles.titleText}>
 //     Welcome!
 //   </Text>
 //   <Text style={styles.mainText}>
 //     Ready to start living a sustainable lifestyle?
 //   </Text>
 //   <Text style={styles.mainText}>
 //     Let's start by answering a few questions. If you don't know the answer, take your best guess!
 //   </Text>
 //   <Text style={styles.titleText}>
 //     How many miles do you drive in your car?
 //   </Text>
 //   <Text style={styles.mainText}>
 //     "description"
 //   </Text>
 //   <TextInput style = {styles.input}
 //       underlineColorAndroid = "transparent"
 //       placeholder = "Miles"
 //       placeholderTextColor = "#9a73ef"
 //       autoCapitalize = "none"
 //       onChangeText = {this.handleCarTransportation}/>
 //   <Text style={styles.titleText}>
 //     How many miles do you use public transportation for?
 //   </Text>
 //   <Text style={styles.mainText}>
 //     "description"
 //   </Text>
 //   <TextInput style = {styles.input}
 //      underlineColorAndroid = "transparent"
 //      placeholder = "Miles"
 //      placeholderTextColor = "#9a73ef"
 //      autoCapitalize = "none"
 //      onChangeText = {this.handlePassword}/>
 // </View>
    // <TouchableOpacity
    //    style = {styles.submitButton}
    //    onPress = {
    //       () => this.login(this.state.email, this.state.password)
    //    }>
    //    <Text style = {styles.submitButtonText}> Submit </Text>
    // </TouchableOpacity>

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
   },
   text: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
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
    padding: 20
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
  scrollView: {
    marginHorizontal: 20
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
