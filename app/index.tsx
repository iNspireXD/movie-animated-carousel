import { Link } from "expo-router";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { Movie } from "../hooks/useFetchMovies";
import Genre from "../components/Genre";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");
const SPACING = 10;
const ITEM_SIZE = width * 0.6;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    async function fetchData() {
      const movies = await useFetchMovies();
      setMovies(movies);
    }
    if (movies?.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies?.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        scrollEventThrottle={16}
        snapToAlignment="start"
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => {
          if (!item.poster) return <View style={{ width: EMPTY_ITEM_SIZE }} />;

          return (
            <View style={{ width: ITEM_SIZE }}>
              <View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
