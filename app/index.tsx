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
import Rating from "../components/Rating";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);

  //empty item for fake space
  const emptyObject = {
    key: "",
    title: "",
    poster: "",
    backdrop: "",
    rating: "",
    description: "",
    releaseDate: "",
    genres: "",
  };

  useEffect(() => {
    async function fetchData() {
      const movies = await useFetchMovies();
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

  if (movies?.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        scrollEventThrottle={16}
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
                <Rating rating={item.rating} />
                <Genre genre={item.genres} />
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
    backgroundColor: "white",
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
