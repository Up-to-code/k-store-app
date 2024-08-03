import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { addProduct } from "@/lib/store/useSaveitem";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Product } from "@/app/(app)/home";
import { truncateString } from "@/lib/ShortText";

const Cart: React.FC<{ products: Product }> = ({ products }) => {
  const handlePress = () => {
    const url = `/show/${products.id}`;
    router.push(url);
  };

  const handleAddToCart = () => {
    ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
    addProduct(products, products.id);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image
        source={{ uri: products.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>
        {truncateString(products.title, 30).trim()}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{products.price}</Text>
        <Pressable onPress={handleAddToCart}>
          <AntDesign name="heart" size={20} color="#6e6e6e" />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2 - 20,
    margin: 10,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#5959594b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  title: {
    color: "#292929",
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  price: {
    fontFamily: "Cairo-Medium",
    fontSize: 16,
    color: "#f00",
    fontWeight: "bold",
  },
});

export default Cart;
