import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  genre: string;
};

const Genre = ({ genre }: Props) => {
  return (
    <View>
      <Text>{genre}</Text>
    </View>
  );
};

export default Genre;

const styles = StyleSheet.create({});
