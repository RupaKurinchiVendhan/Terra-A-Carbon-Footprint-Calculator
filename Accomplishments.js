import React, {useState} from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, FlatList } from 'react-native';
import ActivityRings, {ActivityRingsData, ActivityRingsConfig} from "react-native-activity-rings";
// import ActivityRings from "react-native-activity-rings";

const activityData = [
   { value: 0.8 },
   { value: 0.6 },
   { value: 0.2 }
 ];

const activityConfig = {
   width: 150,
   height: 150
 };

export default class Accomplishments() extends React.Component {
    render() {
    return (
      <View>
        <ActivityRings data={activityData} config={activityConfig} />
      </View>
      );
    }
}
