import firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";

const Header = ({ user }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fafafa",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          paddingTop: 35,
          paddingBottom: 10,
          paddingHorizontal: 5,
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={{ fontSize: 24, color: "#303569", paddingLeft: 5 }}>
          My Habits
        </Text>
        <StatusBar style="dark" />
      </View>
      {user ? (
        <TouchableOpacity
          style={{
            border: "none",
            borderRadius: 4,
            padding: 10,
            paddingHorizontal: 15,
            margin: 0,
            textDecoration: "none",
            backgroundColor: "#616aca",
            color: "#ffffff",
            fontFamily: "Lato",
            fontSize: 16,
            cursor: "pointer",
            textAlign: "center",
          }}
          onPress={() => {
            firebase.auth().signOut();
          }}
        >
          Log Out
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default Header;
