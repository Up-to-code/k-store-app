import { truncateString } from "@/lib/ShortText";
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Product } from "@/app/(app)/home";



const Cart = ({ products }: { products: Product}) => {
 
  return (
    <Pressable
      onPress={() => {
        const url = `/show/${products.id}`;
        router.push(url as any);
      }}
      style={styles.container}
      className=" h-[300px] bg-white py-1 px-4 rounded flex justify-center "
    >
      <Image
        source={{ uri: products.images[0] }}
        className="w-full  h-[60%] mb-4"
        resizeMode="contain"
      />

      <Text
        style={{ color: "#292929", fontFamily: "Cairo-Bold" }}
        className=" font-bold "
      >
        {truncateString(products.title, 30)}
      </Text>

      <View className="flex flex-row justify-between items-center mt-4">
        <Text
          style={{ fontFamily: "Cairo-Medium" }}
          className="text-lg mt-1 font-bold text-red-400"
        >
          {products.price}
        </Text>
        <Pressable
          onPress={() => {
            ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
            addProduct(products);
          }}
        >
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
    shadowColor: "#5959594b",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});

export default Cart;
