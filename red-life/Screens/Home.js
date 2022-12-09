import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Alert,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native-gesture-handler";
//asdas
//asd
export default function Home({ route, navigation }) {
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [StepCount, updateStepCount] = useState(0);
  const [name, setName] = useState("");
  const [targetDist, setTargetDist] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [targetSteps, setTargetSteps] = useState(10);

  useEffect(() => {
    stepping();
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem("username").then((value) => {
        if (value != "") {
          setName(value);
        }
      });
      await AsyncStorage.getItem("targetDist").then((value) => {
        if (value != "") {
          setTargetDist(value);
          setTargetSteps(value * 1312.336);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  var Dist = StepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);

  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  stepping = () => {
    const step = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps);
    });
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };
  //sadasdasdss
  return (
    <View style={styles.container}>
      <RefreshControl refreshing={refreshing} onRefresh={getData} />
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("../assets/moving.gif")}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Pedometer availability: {PedometerAvailability}
          </Text>
          <View style={{ flex: 1, marginTop: "5%", alignItems: "center" }}>
            <CircularProgress
              value={StepCount}
              maxValue={parseInt(targetSteps)}
              radius={120}
              textColor={"#ecf0f1"}
              activeStrokeColor={"#f39c12"}
              inActiveStrokeColor={"#9b59b6"}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={40}
              activeStrokeWidth={40}
              title={"Step Count"}
              titleColor={"#ecf0f1"}
              titleStyle={{ fontWeight: "bold" }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontFamily: "monospace",
                alignItems: "center",
                margin: 5,
              }}>
              {name}
            </Text>

            <Button
              title="Set Goal"
              onPress={() => navigation.navigate("Weekly Goal Setting")}
            />
          </View>

          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.textDesign,
                  { paddingLeft: 10, marginLeft: "23%" },
                ]}>
                Target : {parseInt(targetSteps)} steps({targetDist}km)
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.textDesign,
                  { paddingLeft: 20, marginLeft: "-3%" },
                ]}>
                Distance Covered : {DistanceCovered} km
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.textDesign,
                  { paddingLeft: 10, marginLeft: "23%" },
                ]}>
                Calories Burnt: {caloriesBurnt}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "5%",
  },
  headingDesign: {
    marginTop: 5,
    color: "white",
    backgroundColor: "rgba(155,89,182,0.5)",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "monospace",
    justifyContent: "center",
  },
  textDesign: {
    backgroundColor: "rgba(155,89,182,0.5)",
    height: 50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});
