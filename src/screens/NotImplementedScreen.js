import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented</Text>
      <Image
        source={{
          uri: "https://m.espacepourlavie.ca/sites/espacepourlavie.ca/files/styles/gal-photo-large/public/hydrochoerus-hydrochaeris-1110.png?itok=mgN4_S1f",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default NotImplementedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
  },
  image: {
    width: "80%",
    aspectRatio: 2 / 1,
  },
});
