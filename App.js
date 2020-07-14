import React, { useEffect, useState } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

import { AppLoading } from "expo";
import firebase from "firebase";
import Header from "./components/header";
import LogIn from "./components/login";

var firebaseConfig = {
  apiKey: "AIzaSyB94YmeDMN-o3JM8GW2BzfTeSRP9E2SMCs",
  authDomain: "to-do-list-d0060.firebaseapp.com",
  databaseURL: "https://to-do-list-d0060.firebaseio.com",
  projectId: "to-do-list-d0060",
  storageBucket: "to-do-list-d0060.appspot.com",
  messagingSenderId: "385324177482",
  appId: "1:385324177482:web:ba21154e1ebb3d8bd0eeb3",
  measurementId: "G-FHXX892BY5",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export default function App() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  let [fontsLoaded] = useFonts({
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Header user={user} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flex: 1 }}
        style={styles.container}
      >
        <ImageBackground
          source={require("./assets/confetti.png")}
          style={{ ...styles.backgroundImage, flex: 1 }}
        >
          <SafeAreaView>
            <View>
              {user ? (
                <Text>Hello, {user.uid}</Text>
              ) : (
                <LogIn user={user} setUser={setUser} />
              )}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4F5ACE",
  },

  backgroundImage: {},
});
