import React, { useEffect, useState } from "react";
import { useFonts } from "@use-expo/font";
import {
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
import ListContainer from "./components/listContainer";
import { v4 as uuidv4 } from "uuid";

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
  const [signingUp, setSigningUp] = useState(false);

  const [listItems, setListItems] = useState([
    {
      name: "This isn't part of my routine, so I need a reminder!",
      done: false,
      doneDate: null,
      type: "once",
      id: uuidv4(),
      dateEdited: Date.now(),
    },
    {
      name: "I do this every day!",
      done: false,
      doneDate: null,
      type: "daily",
      id: uuidv4(),
      dateEdited: Date.now(),
    },
    {
      name: "This just needs to be done when I have time this week.",
      done: false,
      doneDate: null,
      type: "weekly",
      id: uuidv4(),
      dateEdited: Date.now(),
    },
    {
      name: "This is so easy to forget, since I only do it once a month.",
      done: false,
      doneDate: null,
      type: "monthly",
      id: uuidv4(),
      dateEdited: Date.now(),
    },
  ]);

  const setNewUserToDos = (userId) => {
    //setInitial toDos for a new user.
    const initialListItems = [...listItems];
    const { user } = userCredential;
    return Promise.all(
      initialListItems.map((initialListItem) => {
        firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("toDos")
          .doc(initialListItem.id)
          .set({ ...initialListItem });
      })
    ).catch((e) => console.log("error", e));
  };
  async function loadToDos(userId) {
    //Load my to dos from the database.
    const collectionSnapshot = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("toDos")
      .get();
    const loadedToDos = [];
    collectionSnapshot.forEach((documentSnapshot) => {
      loadedToDos.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      });
    });
    setListItems(loadedToDos);
    if (user && user.uid) {
      loadToDos(user.uid);
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user && user.uid) {
        signingUp ? setNewUserToDos() : loadToDos();
      }
    });
  }, [user]);

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
      <ImageBackground
        source={require("./assets/confetti.png")}
        style={{ flex: 1, backgroundColor: "#4F5ACE" }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{}}
        >
          <SafeAreaView>
            <View>
              {user ? (
                <>
                  <ListContainer
                    user={user}
                    setListItems={setListItems}
                    listItems={listItems}
                  />
                </>
              ) : (
                <LogIn
                  user={user}
                  listItems={listItems}
                  signingUp={signingUp}
                  setSigningUp={setSigningUp}
                />
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
