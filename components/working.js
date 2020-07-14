import React, { useState } from "react";
import firebase from "firebase";
import { TextInput, Text, View, Image, TouchableHighlight } from "react-native";
//import Router from "next/router";
//import ListContainer from "../components/ListContainer";

const LogIn = ({ user, signingUp, setSigningUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const attemptLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Router.push("/");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <>
      {signingUp ? (
        <View style={} /*Log In Styles */>
          <Text>Sign Up</Text>
          <View>
            <Text>Email</Text>
            <TextInput
              autoCompleteType="email"
              value={email}
              setEmail={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View>
            <Text htmlFor="password">Password</Text>
            <TextInput
              autoCompleteType="password"
              value={password}
              setPassword={(text) => setPassword(text)}
            ></TextInput>
          </View>
          <TouchableHighlight
            onPress={() => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(errorMessage);
                });
            }}
          >
            Create an Account
          </TouchableHighlight>

          <p style={{ color: "red" }}>{error ? error : ""}</p>
          <a
            href="#"
            onPress={(e) => {
              e.preventDefault();
              setSigningUp(false);
            }}
          >
            Already have an account?
          </a>
        </View>
      ) : (
        <View className="logIn">
          <Text className="form-Text">Sign In</Text>

          <View>
            <Text htmlFor="email">Email</Text>
            <TextInput
              autoCompleteType="email"
              value={email}
              setEmail={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View>
            <Text htmlFor="password">Password</Text>
            <TextInput
              autoCompleteType="password"
              value={password}
              setPassword={(text) => setPassword(text)}
            ></TextInput>
          </View>
          <TouchableHighlight
            onPress={() => {
              attemptLogIn();
            }}
          >
            Sign In
          </TouchableHighlight>
          <p style={{ color: "red" }}>{error ? error : ""}</p>
          <a
            href="#"
            onPress={(e) => {
              e.preventDefault();
              setSigningUp(true);
            }}
          >
            Don't have an account?
          </a>
        </View>
      )}
    </>
  );
};
export default LogIn;
