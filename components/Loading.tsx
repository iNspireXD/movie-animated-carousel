import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.paragraph}>Loading....</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
