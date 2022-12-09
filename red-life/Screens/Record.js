import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view'



export default function Records({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Button
            title='Go back'
            onPress={() => navigation.goBack()} />
      </View>
      <View style={{backgroundColor: '#fde4e4'}}>
        <View style={styles.headingDesign}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>My progress</Text>
        </View>
        <View style={styles.headingDesign}>
          <Text style={{}}>0.0</Text>
          <Text style={{}}>TOTAL KM</Text>
        </View>
        <View style={styles.headingDesign}>
          <Text style={{}}>0.00</Text>
          <Text style={{}}>TOTAL HOURS</Text>
        </View>
        <View style={styles.headingDesign}>
          <Text style={{}}>0.0</Text>
          <Text style={{}}>TOTAL KCAL</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6cbef',
    marginTop: '5%',
  },
  headingDesign:{
    width: 100,
    marginTop: 5,
    color: 'white',
    backgroundColor: 'rgba(155,89,182,0.5)',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    justifyContent: 'center'
  },
  textDesign: {
    backgroundColor: 'rgba(155,89,182,0.5)',
    height: 50,
    width: '85%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  }
});