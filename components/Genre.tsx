import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  genres: string[];
};

const Genre = ({ genres }: Props) => {
  return (
    <View style={styles.container}>
      {genres.map((genre, index) => {
        return (
          <View key={index} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Genre;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9,
    opacity: 0.9,
  },
});
