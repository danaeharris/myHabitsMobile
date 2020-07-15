import firebase from "firebase";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
const List = ({ listItems, setListItems, title, user }) => {
  return (
    <View style={{ margin: 10 }}>
      <Text
        style={{
          color: "#fafafa",
          fontWeight: "400",
          fontSize: 18,
          fontFamily: "Lato-Regular",
          textTransform: "uppercase",
          opacity: 0.7,
          letterSpacing: 1.5,
        }}
      >
        {title}
      </Text>
      {listItems.map((listItem, i) => {
        if (listItem.type !== title) {
          return null;
        }
        let displayChecked = true;
        if (!listItem.doneDate) {
          displayChecked = false;
        } else if (
          //code checking if date is not the same
          (new Date(listItem.doneDate).getDate() !==
            new Date(Date.now()).getDate() ||
            new Date(listItem.doneDate).getMonth() !==
              new Date(Date.now()).getMonth() ||
            new Date(listItem.doneDate).getFullYear() !==
              new Date(Date.now()).getFullYear()) &&
          listItem.type === "daily"
        ) {
          displayChecked = false;
        } else if (
          listItem.type === "weekly" &&
          /*code checking if date is within week*/
          (new Date(listItem.doneDate).getDate() >
            new Date(Date.now()).getDate() + 7 ||
            //ERROR? Should it be 6?
            new Date(listItem.doneDate).getMonth() !==
              new Date(Date.now()).getMonth() ||
            new Date(listItem.doneDate).getFullYear() !==
              new Date(Date.now()).getFullYear())
        ) {
          displayChecked = false;
        } else if (
          /*code checking if date is within month*/
          (new Date(listItem.doneDate).getMonth() !==
            new Date(Date.now()).getMonth() ||
            new Date(listItem.doneDate).getFullYear() !==
              new Date(Date.now()).getFullYear()) &&
          listItem.type === "monthly"
        ) {
          displayChecked = false;
        }
        return (
          <View
            key={listItem.id}
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              backgroundColor: "#fafafa",
              paddingVertical: 20,
              paddingHorizontal: 2,
              borderRadius: 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  const newArray = [...listItems];
                  displayChecked = !displayChecked;
                  if (displayChecked) {
                    listItem.doneDate = Date.now();
                  } else {
                    listItem.doneDate = null;
                  }
                  setListItems(newArray);

                  firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .collection("toDos")
                    .doc(listItem.id)
                    .set({ doneDate: listItem.doneDate }, { merge: true });
                }}
              >
                <Image
                  style={
                    displayChecked
                      ? {
                          opacity: 0.5,
                          height: 25,
                          width: 25,
                          marginLeft: 10,
                        }
                      : {
                          opacity: 1,
                          height: 25,
                          width: 25,
                          marginLeft: 10,
                        }
                  }
                  source={
                    displayChecked
                      ? require("../assets/check-done.png")
                      : require("../assets/check-not-done.png")
                  }
                  alt="check box"
                />
              </TouchableOpacity>
              <Text
                style={
                  displayChecked
                    ? {
                        opacity: 0.5,
                        color: "#303569",
                        fontWeight: "400",
                        fontSize: 18,
                        fontFamily: "Lato-Regular",
                      }
                    : {
                        opacity: 1,
                        color: "#303569",
                        fontWeight: "400",
                        fontSize: 18,
                        fontFamily: "Lato-Regular",
                      }
                }
              >
                {listItem.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{ position: "absolute", top: 5, right: 5 }}
              accessible={true}
              accessibilityLabel="delete button"
              accessibilityHint="deletes this to do item."
              onPress={() => {
                const firstListItems = [...listItems];
                firstListItems.splice(i, 1);
                setListItems(firstListItems);

                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.uid)
                  .collection("toDos")
                  .doc(listItem.id)
                  .delete();
              }}
            >
              <Image
                source={require("../assets/x-square.png")}
                style={styles.imageButton}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    margin: 30,
    alignItems: "flex-start",
    position: "relative",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    fontSize: 16,
    width: "90%",
    padding: 10,
    marginVertical: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
  imageButton: {
    height: 25,
    width: 25,
    marginLeft: 10,
    opacity: 0.2,
  },
});
export default List;
