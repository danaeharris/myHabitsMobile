import React, { useState } from "react";
import firebase from "firebase";
import {
  TextInput,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { v4 as uuidv4 } from "uuid";

const LogIn = ({ user, signingUp, setSigningUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const attemptLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <>
      {signingUp ? (
        <View style={styles.logIn}>
          <View style={styles.textInput}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View>
            <Text htmlFor="password">Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCompleteType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
          <TouchableHighlight
            accessible={true}
            accessibilityLabel="Create an account"
            accessibilityHint="Submits your email and password to create an account."
            style={styles.button}
            onPress={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                  console.log("There was an error", error);
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(errorMessage);
                });
            }}
            underlayColor="#3C44A3"
          >
            <Text style={styles.buttonText}>Create an Account</Text>
          </TouchableHighlight>
          <Text style={{ color: "red" }}>{error ? error : ""}</Text>
          <TouchableHighlight
            accessible={true}
            accessibilityLabel="Already have an account"
            accessibilityHint="Navigates you to the log in form."
            style={{ alignSelf: "center" }}
            onPress={() => {
              setError(null);
              setSigningUp(false);
            }}
          >
            <Text>Already have an account?</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.logIn}>
          <View>
            <Text htmlFor="email">Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View>
            <Text htmlFor="password">Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCompleteType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
          <TouchableHighlight
            accessible={true}
            accessibilityLabel="log in button"
            accessibilityHint="logs you into the app."
            style={styles.button}
            onPress={() => {
              attemptLogIn();
            }}
            underlayColor="#3C44A3"
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <Text style={{ color: "red" }}>{error ? error : ""}</Text>
          <TouchableHighlight
            accessible={true}
            accessibilityLabel="Don't have an account"
            accessibilityHint="Navigates you to the sign up form."
            style={{ alignSelf: "center" }}
            onPress={() => {
              setError(null);
              setSigningUp(true);
            }}
          >
            <Text>Don't have an account?</Text>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logIn: {
    backgroundColor: "#fafafa",
    marginTop: "30%",
    alignSelf: "center",
    height: 275,
    width: 275,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 4,
  },
  input: {
    marginRight: 10,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#cccccc",
    padding: 9,
    borderRadius: 4,
    width: 250,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    borderRadius: 4,
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 0,
    backgroundColor: "#4F5ACE",
    textAlign: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
});

export default LogIn;
