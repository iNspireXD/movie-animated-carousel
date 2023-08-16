import {
  View,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { Movie } from "../hooks/useFetchMovies";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  movies: Movie[];
  scrollX: Animated.Value;
};

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.65;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;

const Backdrop = ({ movies, scrollX }: Props) => {
  return (
    <View style={{ position: "absolute", width, height: BACKDROP_HEIGHT }}>
      <FlatList
        horizontal
        data={movies.reverse()}
        keyExtractor={(item) => `${item.key} + ${item.title}`}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0, width],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;
