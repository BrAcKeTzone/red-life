import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native-gesture-handler";

const WeeklyGoalSetting = ({ navigation }) => {
  const [targetDist, setTargetDist] = React.useState("");

  const handleTargetDist = async () => {
    if (targetDist) {
      try {
        await AsyncStorage.setItem("targetDist", targetDist);
        Alert.alert("Success", "Target set", [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Home");
            },
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Empty ang animal");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ backgroundColor: "#fde4e4", padding: 10, borderRadius: 10 }}>
        <View style={styles.inContainer}>
          <Text>Your Weekly Goal is Ready</Text>
          <Text>KM</Text>
          <TextInput
            style={{
              width: 150,
              borderWidth: 1,
              borderRadius: 5,
              padding: 6,
              marginBottom: 3,
            }}
            onChangeText={(anyText) => setTargetDist(anyText)}
            placeholder="Target value base on bmi"
            keyboardType="numeric"
          />
        </View>
        <Button title="Submit" onPress={handleTargetDist} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c6cbef",
    alignItems: "center",
    justifyContent: "center",
  },
  inContainer: {
    backgroundColor: "#c6cbef",
    padding: 20,
    margin: 10,
  },
});

export default WeeklyGoalSetting;
