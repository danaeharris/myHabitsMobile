import firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import { TouchableHighlight, Text, View, Image } from "react-native";
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
        <>
          <TouchableHighlight
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
            underlayColor="#38409a;"
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            <Text>Log Out</Text>
          </TouchableHighlight>
        </>
      ) : null}
    </>
  );
};

export default Header;
