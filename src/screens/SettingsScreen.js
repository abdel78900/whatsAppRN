import React from "react";
import { Button, View } from "react-native";
import { Auth } from "aws-amplify";

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => Auth.signOut()} title="Sign out"></Button>
    </View>
  );
};

export default SettingsScreen;
