import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'assistant-bold': require('./assets/Assistant-Bold.ttf'),
    'assistant-semi': require('./assets/Assistant-SemiBold.ttf'),
    'sacramento': require('./assets/Sacramento-Regular.ttf'),
  });
};

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    width: 1000,
    paddingTop: 38,
    marginBottom: 5,
    backgroundColor: '#69941c',
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 30,
    // letterSpacing: 2,
    fontWeight: 'bold',
    fontFamily: 'assistant-semi',
  }
});
