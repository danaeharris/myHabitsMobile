import firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import { TouchableHighlight, Text, View, Image } from "react-native";
import React from "react";

const Header = ({ user }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fafafa",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 35,
        paddingBottom: 10,
        paddingHorizontal: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text
          style={{
            fontSize: 24,
            color: "#303569",
            paddingLeft: 5,
            fontFamily: "Lato-Bold",
          }}
        >
          My Habits
        </Text>
      </View>
      <StatusBar style="dark" />

      {user ? (
        <>
          <TouchableHighlight
            style={{
              borderRadius: 4,
              padding: 10,
              paddingHorizontal: 15,
              marginVertical: 15,
              marginHorizontal: 0,
              backgroundColor: "#4F5ACE",
              textAlign: "center",
              alignSelf: "center",
            }}
            underlayColor="#3C44A3"
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "Lato-Regular",
                fontSize: 16,
              }}
            >
              Log Out
            </Text>
          </TouchableHighlight>
        </>
      ) : null}
    </View>
  );
};

export default Header;
