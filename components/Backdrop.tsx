import { View, Dimensions, FlatList, Image, Platform } from "react-native";
import React, { memo, useRef } from "react";
import { Movie } from "../hooks/useFetchMovies";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const RenderItem = memo(
  ({
    item,
    index,
    scrollX,
  }: {
    item: Movie;
    index: number;
    scrollX: Animated.SharedValue<number>;
  }) => {
    if (!item.backdrop) {
      return null;
    }
    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

    const rstyle = useAnimatedStyle(() => {
      const translateX = interpolate(scrollX.value, inputRange, [0, width]);
      return {
        width: translateX,
      };
    });

    return (
      <Animated.View
        removeClippedSubviews={false}
        style={[
          {
            position: "absolute",
            height,
            overflow: "hidden",
          },
          rstyle,
        ]}
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
  }
);

type Props = {
  movies: Movie[];
  scrollX: Animated.SharedValue<number>;
};

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.65;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;

const Backdrop = ({ movies, scrollX }: Props) => {
  return (
    <View style={{ position: "absolute", width, height: BACKDROP_HEIGHT }}>
      <Animated.FlatList
        horizontal
        data={movies.reverse()}
        keyExtractor={(item) => `${item.key} + ${item.title}`}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} scrollX={scrollX} />
        )}
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
