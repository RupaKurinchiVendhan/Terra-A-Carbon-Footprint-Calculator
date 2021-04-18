import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
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
import { Picker } from '@react-native-picker/picker';
// import MultipleChoice from 'react-native-multiple-choice';

var transportation_score = 0;
var waste_score = 0;
var utility_score = 0;

var max_transportation = 55;
var max_waste = 110;
var max_utility = 30;

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

class TranspoDiagnostic extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', sliderValue: 0 };
  }
  render () {
    return (
      <View>
        <Text style={styles.title}>
          Transportation
        </Text>
        <Text style={styles.taskText}>
          How many miles do you drive per year?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100000}
         value={this.state.sliderValue}
         onValueChange={val => this.setState({ sliderValue: val })}
        />
        <Text style={styles.taskText}>
          {this.state.sliderValue}
        </Text>
      </View>
    )
  }
}

class WasteDiagnostic extends Component {

  constructor(props) {
    super(props);
    this.state = {meat: 0};
    this.state = {vegan: 'No'};
    this.state = {appliances: 0};
    this.state = {trash: 0};
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>
          Waste
        </Text>
        <Text style={styles.taskText}>
          How many days a week do you eat meat?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={7}
         value={this.state.meat}
         onValueChange={val => this.setState({ meat: val })}
        />
        <Text style={styles.taskText}>
          {this.state.meat} days
        </Text>
        <Text style={styles.taskText}>
          Are you a vegan?
        </Text>
        <Picker
          // selectedValue={"No"}
          onValueChange={veganism => this.setState({vegan: veganism})}>
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label='No' value='No' />
        </Picker>
        <Text style={styles.taskText}>
          How many new household appliances do you purchase each year (eg furniture, electronics)?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={10}
         value={this.state.appliances}
         onValueChange={val => this.setState({ appliances: val })}
        />
        <Text style={styles.taskText}>
          {this.state.appliances} applicances
        </Text>
        <Text style={styles.taskText}>
          About how many trash cans do you fill per week?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={5}
         value={this.state.trash}
         onValueChange={val => this.setState({trash: val })}
        />
        <Text style={styles.taskText}>
          {this.state.trash} trash cans
        </Text>
      </View>
        // <MultipleChoice
        //     options={[
        //     'Lorem ipsum dolor sit',
        //     'Lorem ipsum',
        //     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        //     'Lorem ipsum dolor sit amet, consetetur',
        //     'Lorem ipsum dolor'
        //     ]}
        //     selectedOptions={['Lorem ipsum']}
        //     maxSelectedOptions={2}
        //     onSelection={(option)=>alert(option + ' was selected!')}
        // />

    );
  }
}

class UtilDiagnostic extends Component {
  constructor(props) {
    super(props);
    this.state = {roommates: 0};
    this.state = {house: 'No'};
    this.state = {washing: 0};
  }

  var util = [this.state.roommates, 0, this.state.washing];
  var util2 = calculate_utility(util);

  render() {
    return (
      <View>
        <Text style={styles.title}>
          Utilities
        </Text>
        <Text style={styles.taskText}>
          How many people do you live with?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={10}
         value={this.state.roommates}
         onValueChange={val => this.setState({ roommates: val })}
        />
        <Text style={styles.taskText}>
          {this.state.roommates} people
        </Text>
        <Text style={styles.taskText}>
          How big would you say your house is?
        </Text>
        <Picker
          onValueChange={size => this.setState({house: size})}>
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label='No' value='No' />
        </Picker>
        <Text style={styles.taskText}>
          How many times a week do you run the dishwasher, washing machine, and dryer?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={20}
         value={this.state.washing}
         onValueChange={val => this.setState({ washing: val })}
        />
        <Text style={styles.taskText}>
          {this.state.washing} times
        </Text>
      </View>
    );
  }
}

export default class Diagnostic extends Component {
  state = {
      transportation: 0,
      waste: 0,
      utility: 0,
      meat: 0
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
            <WasteDiagnostic/>
            <UtilDiagnostic/>
          </ScrollView>
        </SafeAreaView>


            // <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            //   <Slider
            //     value={this.state.car_transportation}
            //     onValueChange={(value) => this.handleCarTransportation({ value })}
            //   />
            //   <Text>Value: {this.state.value}</Text>
            // </View>
            // <TextInput style = {styles.input}
            //     underlineColorAndroid = "transparent"
            //     placeholder = "Miles"
            //     placeholderTextColor = "#9a73ef"
            //     autoCapitalize = "none"
            //     onChangeText = {this.handleCarTransportation}/>
      );
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
    fontFamily: 'assistant-bold',
    fontSize: 23,
    color: '#69941c',
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
    fontSize: 30,
    color: '#69941c',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  taskText: {
    fontFamily: 'assistant-light',
    // alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    fontSize: 18,
    color: '#000000',
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
