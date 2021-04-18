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
        transportation_score = 15;
    }
    else if (car > 10000) {
        transportation_score = 10;
    }
    else if (car > 1000) {
        transportation_score = 6;
    }
    else if (car > 0) {
        transportation_score = 4;
    }

    return transportation_score;
}

function public_transportation(buses) {
    // miles of public transportation usage per year
    if (buses > 20000) {
        transportation_score = 20;
    }
    else if (buses > 15000) {
        transportation_score = 10;
    }
    else if (buses > 10000) {
        transportation_score = 6;
    }
    else if (buses > 1000) {
        transportation_score = 4;
    }
    else if (buses > 0) {
        transportation_score = 2;
    }
    return transportation_score;
}

function flight_transportation(flight) {
    // flight distance per year
    if (flight == 0) {
        transportation_score = 0;
    }
    else if (flight == 1) {
        transportation_score = 2;
    }
    else if (flight == 2) {
        transportation_score = 6;
    }
    else if (flight == 3) {
        transportation_score = 20;
    }
    return transportation_score;
}

function get_transportation() {
    return '%.2f'%(transportation_score / max_transportation);
}

function meat_waste(meat) {

    // Meat per week
    if (meat == 7) {
        waste_score = 10;
    }
    else if (meat > 2) {
        waste_score = 8;
    }
    else if (meat > 0) {
        waste_score = 5;
    }
    return waste_score;
}

function vegan_waste(vegan) {
    // Vegan y/n
    if (vegan == 1) {
        waste_score = 2;
    }
    else if (vegan == 0 && vegan == 0) {
        waste_score = 4;
    }
    return waste_score;
}

function diet_waste(diet) {
    // Diet type (prepackaged, fresh, mix)
    if (diet == 0) {
        waste_score = 12;
    }
    else if (diet == 1) {
        waste_score = 6;
    }
    else if (diet == 2) {
        waste_score = 2;
    }
    return waste_score;
}

function appliance_waste(appliance) {
    // Household purchases per year
    if (appliance > 7) {
        waste_score = 10;
    }
    else if (appliance > 5) {
        waste_score = 8;
    }
    else if (appliance > 3) {
        waste_score = 6;
    }
    else if (appliance > 0) {
        waste_score = 4;
    }
    else {
        waste_score += 2;
    }
    return waste_score;
}

function trash_waste(trash) {
    // Trash cans filled per week
    if (trash >= 4) {
        waste_score = 50;
    }
    else if (trash == 3) {
        waste_score = 40;
    }
    else if (trash == 2) {
        waste_score = 30;
    }
    else if (trash == 1) {
        waste_score = 20;
    }
    else {
        waste_score = 5;
    }
    return waste_score;
}

function recycle_waste(recycle) {
    // Types of waste recycled:
    waste_score += 24;
    waste_score -= 4 * recycle;

    return waste_score;
}

function people_utility(people) {

   // People in household
   if (people > 5) {
       utility_score = 2;
   }
   else if (people == 5) {
       utility_score = 4;
   }
   else if (people == 4) {
       utility_score = 6;
   }
   else if (people == 3) {
       utility_score = 8;
   }
   else if (people == 2) {
       utility_score = 10;
   }
   else if (people == 1) {
       utility_score = 12;
   }
   else {
       utility_score = 14;
   }
   return utility_score;
}

function house_utility(house) {
   // House size
   if (house == 0) {
       utility_score = 10;
   }
   else if (house == 1) {
       utility_score = 7;
   }
   else if (house == 2) {
       utility_score = 4;
   }
   else {
       utility_score = 2;
   }
   return utility_score;
}

function water_utility(water) {
   // Water usage per week
   if (water > 18) {
       utility_score += 6;
   }
   else if (water > 8) {
       utility_score += 4;
   }
   else if (water >= 1) {
       utility_score += 1;
   }
   return utility_score;
}

flight_options = [
  {id:0, choice: 'Never or rarely'},
  {id:1, choice: 'Short distances (within state)'},
  {id:2, choice: 'Further distances (nearby state or country)'},
  {id:3, choice: 'Far (another continent)'},
]

vegan_options = [
  {id:0, choice: 'Yes'},
  {id:1, choice: 'No'}
]

house_options = [
  {id:0, choice: 'Large'},
  {id:1, choice: 'Medium'},
  {id:2, choice: 'Small'},
  {id:3, choice: 'Apartment'},

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
          onPress={() => {setSelected(answer.id); callback(answer.id)}}
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
    this.onUpdate()
  }

  onUpdate = () => {
    this.props.callback(this.state)
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
         value={this.state.car_mileage}
         onValueChange={val => {this.setState({ car_mileage: val }); this.onUpdate()}}
        />
        <Text style={styles.taskText2}>
          {(Math.round(this.state.car_mileage/1000)*1000).toLocaleString(undefined, {minimumFractionDigits:0})} miles
        </Text>
        <Text style={styles.taskText}>
          How many miles of public transportation?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100000}
         value={this.state.public_trans_mileage}
         onValueChange={val => {this.setState({ public_trans_mileage: val }), this.onUpdate()}}
        />
        <Text style={styles.taskText2}>
          {(Math.round(this.state.public_trans_mileage/1000)*1000).toLocaleString(undefined, {minimumFractionDigits:0})} miles
        </Text>
        <Text style={styles.taskText}>
          How far do you usually fly?
        </Text>
        <MultipleSelect
          options={flight_options}
          callback={this.updateFlight}
        />
        <Text style={styles.taskText2}>
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
    this.state = {vegan: 0};
    this.state = {packaging: 0}
    this.state = {appliances: 0};
    this.state = {trash: 0};
    this.state = {recycle: 0};
  }

  updateVegan = (idx) => {
    this.setState({vegan: idx})
  }

  onUpdate = () => {
    this.props.callback(this.state)
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
        <Text style={styles.taskText2}>
          {this.state.meat} days
        </Text>
        <Text style={styles.taskText}>
          Are you a vegan?
        </Text>
        <MultipleSelect
          options={vegan_options}
          callback={this.updateVegan}
        />
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
        <Text style={styles.taskText2}>
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
        <Text style={styles.taskText2}>
          {this.state.trash} trash cans
        </Text>
        <Text style={styles.taskText}>
          About how many of the following do you recycle (glass, plastic, paper, aluminum, steel, food waste)?
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={6}
         value={this.state.recycle}
         onValueChange={val => this.setState({recycle: val })}
        />
        <Text style={styles.taskText2}>
          {this.state.recycle} recycled items
        </Text>
      </View>

    );
  }
}

class UtilDiagnostic extends Component {
  constructor(props) {
    super(props);
    this.state = {roommates: 0};
    this.state = {house: 0};
    this.state = {washing: 0};
  }

  updateHouse = (idx) => {
    this.setState({house: idx})
  }

  onUpdate = () => {
    this.props.callback(this.state)
  }

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
        <Text style={styles.taskText2}>
          {this.state.roommates} people
        </Text>
        <Text style={styles.taskText}>
          How big would you say your house is?
        </Text>
        <MultipleSelect
          options={house_options}
          callback={this.updateHouse}
        />
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
        <Text style={styles.taskText2}>
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
   }

   calculateTranspo = (res) => {
     var trans_score = car_transportation(res.car_mileage) + public_transportation(res.public_trans_mileage) + flight_transportation(res.flight_mileage)
     this.setState({transportation:trans_score})
   }

   calculateWaste = (res) => {
     var w_score = meat_waste(res.meat) + vegan_waste(res.vegan) + diet_waste(res.packaging) + appliance_waste(res.appliances) + trash_waste(res.trash) + recycle_waste(res.recycle)
     this.setState({waste:w_score})
   }

   calculateUtility = (res) => {
     var ut_score = people_utility_waste(res.roommates) + house_utility(res.house) + water_utility(res.water)
     this.setState({utility:ut_score})
   }

   onSubmit = () => {
     console.log(this.state)
     this.props.callback({new_input:this.state})
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
            <TranspoDiagnostic callback={this.calculateTranspo}/>
            <WasteDiagnostic callback={this.calculateWaste}/>
            <UtilDiagnostic callback={this.calculateUtility}/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.onSubmit()
               }>
               <Text style = {styles.title}> Submit </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
   }
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
    textAlign: 'center',
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
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
  },
  taskText2: {
    fontFamily: 'assistant-light',
    textAlign: 'center',
    fontSize: 18,
    color: '#69941c',
  },
  buttonText: {
    fontSize: 10,
    color: '#69941c',
  },
  scrollView: {
    marginHorizontal: 20,
    marginBottom: 30
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
