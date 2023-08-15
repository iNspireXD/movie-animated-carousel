import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  rating: number;
};

const Rating = ({ rating }: Props) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const stars = [...Array(filledStars).fill("star"), ...maxStars];
  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {stars.map((type, index) => {
        return <AntDesign key={index} name={type} size={12} color="tomato" />;
      })}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  ratingNumber: {
    marginRight: 4,
    fontWeight: "bold",
    fontSize: 14,
  },
});
