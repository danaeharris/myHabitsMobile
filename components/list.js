import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
const List = ({ listItems, setListItems, title, user }) => {
  const [hidden, setHidden] = useState(false);
  return (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="expand list"
        accessibilityHint={`shows ${title} list.`}
        onPress={() => {
          setHidden(!hidden);
        }}
        style={{ paddingTop: 20 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "#fafafa",
              fontWeight: "400",
              fontSize: 18,
              fontFamily: "Lato-Regular",
              textTransform: "uppercase",
              margin: 20,
              opacity: 0.7,
              letterSpacing: 1.5,
            }}
          >
            {title}
          </Text>
          <Image
            source={
              hidden
                ? require("../assets/chevron-side.png")
                : require("../assets/chevron-down.png")
            }
            style={{ height: 35, width: 35, opacity: 0.7 }}
          />
        </View>
      </TouchableOpacity>
      {listItems
        .sort((a, b) => {
          return b.dateEdited - a.dateEdited;
        })
        .filter((x) => x.type === title)
        .map((listItem, i) => {
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
            // code checking if date is within week
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
            // code checking if date is within month
            (new Date(listItem.doneDate).getMonth() !==
              new Date(Date.now()).getMonth() ||
              new Date(listItem.doneDate).getFullYear() !==
                new Date(Date.now()).getFullYear()) &&
            listItem.type === "monthly"
          ) {
            displayChecked = false;
          }

          return (
            <View key={listItem.id}>
              {hidden ? null : (
                <View
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
                  <View style={{ flexDirection: "row", flexShrink: 0 }}>
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
                          .set(
                            { doneDate: listItem.doneDate },
                            { merge: true }
                          );
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
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 10,
                        opacity: 0.2,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
    </View>
  );
};
export default List;
