import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { Movie } from "../hooks/useFetchMovies";
import Genre from "../components/Genre";
import Rating from "../components/Rating";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
import Backdrop from "../components/Backdrop";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

//using memoization for performance when rendering large list
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
    if (!item.poster) {
      return (
        <View
          style={{
            width: EMPTY_ITEM_SIZE,
          }}
        />
      );
    }
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const rstyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollX.value,
        inputRange,
        [100, 50, 100],
        Extrapolate.CLAMP
      );
      return {
        transform: [{ translateY }],
      };
    });

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={[
            {
              marginHorizontal: SPACING,
              padding: SPACING * 2,
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 34,
            },
            rstyle,
          ]}
        >
          <Image source={{ uri: item.poster }} style={styles.posterImage} />
          <Text style={{ fontSize: 18 }} numberOfLines={1}>
            {item.title}
          </Text>
          <Rating rating={item.rating} />
          <Genre genres={item.genres} />
          <Text style={{ fontSize: 12, textAlign: "center" }} numberOfLines={3}>
            {item.description}
          </Text>
        </Animated.View>
      </View>
    );
  }
);

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    async function fetchData() {
      const movies = await useFetchMovies();
      //empty item for fake space
      const emptyObject = {
        title: "",
        poster: "",
        backdrop: "",
        rating: 0,
        description: "",
        releaseDate: "",
        genres: [],
      };
      setMovies([
        { key: "space-left", ...emptyObject },
        ...movies,
        { key: "space-right", ...emptyObject },
      ]);
    }
    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        scrollEventThrottle={16}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate={0.9}
        bounces={false}
        onScroll={scrollHandler}
        renderToHardwareTextureAndroid
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} scrollX={scrollX} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
