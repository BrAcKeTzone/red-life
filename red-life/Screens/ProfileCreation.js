import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view'
import { RadioButton } from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileCreation = ({navigation}) => {
  const [username, setUsername] = React.useState('')
  const [kg, setKG] = React.useState('')
  const [cm, setCM] = React.useState('')
  const [checked, setChecked] = React.useState('Male');
  const [status, setStatus] = React.useState('Normal')
  


  const validate = (event) => {
    if(username.length == 0 || username == "") {
      Alert.alert(
        "Username Error",
        "Username can't be empty",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("Ok Pressed")
            }
          }
        ]
      )
    }
    else if(kg.length == 0 || kg == "") {
      Alert.alert(
        "Weight Error",
        "Weight can't be empty",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("Ok Pressed")
            }
          }
        ]
      )
    }
    else if(cm.length == 0 || cm == "") {
      Alert.alert(
        "Height Error",
        "Height can't be empty",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("Ok Pressed")
            }
          }
        ]
      )
    }
    else{
      let meter = parseInt(cm) / 100
      let bmi = parseInt(kg) / (meter * meter)
      let textBMI = bmi.toString();
      if(bmi >= 40){
        setStatus('Obese');
      }
      else if(bmi >= 25.0 && bmi <= 39.9){
        setStatus('Overweight')
      }
      else if(bmi >= 18.5 && bmi <= 24.9){
        setStatus('Normal')
      }
      else{
        setStatus('Underweight')
      }

      
      Alert.alert(
        "Important", 
        "Please confirm your input fields ",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("cancel pressed")
            }
          },
          {
            text: "Continue",
            onPress: async () => {
              try{
                await AsyncStorage.setItem('username', username)
                await AsyncStorage.setItem('kilogram', kg)
                await AsyncStorage.setItem('height', cm)
                await AsyncStorage.setItem('gender', checked)
                await AsyncStorage.setItem('bmi', textBMI)
                await AsyncStorage.setItem('status', status)
                navigation.navigate('Home')

                // dile ma navigate

              }catch(err){
                console.log(err)
                alert('Something went wrong')
              }

            }
          }
        ]
      )
      // navigation.navigate('Home')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#fde4e4', padding: 10, borderRadius: 10}}>
        <View style={styles.inContainer}>
          <Text>What should I call you?</Text>
          <TextInput 
            placeholder='Username..'
            style={{width: 150, borderWidth: 1, borderRadius: 5, padding: 6, marginBottom: 3}}
            onChangeText={(anyText) => setUsername(anyText)}/>
        </View>
        <View style={styles.inContainer}>
          <Text>What's your gender?</Text>
          <RadioButton.Item
            label="Male"
            value="Male"
            status={ checked === 'Male' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Male')}
          />
          <RadioButton.Item
            label="Female"
            value="Female"
            status={ checked === 'Female' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Female')}
          />
        </View>
        <View style={styles.inContainer}>
          <Text>How much do you weigh (KG)?</Text>
          <TextInput
            style={{width: 150, borderWidth: 1, borderRadius: 5, padding: 6, marginBottom: 3}}
            onChangeText={(anyText)=> setKG(anyText)} 
            placeholder="Weight in KG"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inContainer}>
          <Text>How tall are you (CM)?</Text>
          <TextInput
            style={{width: 150, borderWidth: 1, borderRadius: 5, padding: 6, marginBottom: 3}}
            onChangeText={(anyText)=> setCM(anyText)} 
            placeholder="Height in CM"
            keyboardType="numeric"
          />
        </View>
        <Button
          title="Submit"
          onPress={validate}
          // () => navigation.navigate('Home', { username: setUsername })
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#c6cbef',
      alignItems: 'center',
      justifyContent: 'center'
  },
  inContainer: {
      backgroundColor: '#c6cbef',
      padding: 20,
      margin: 10
  }
})

export default ProfileCreation;