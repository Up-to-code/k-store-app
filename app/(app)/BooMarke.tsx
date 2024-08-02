import Cart from "@/components/ui/Cart";
import {  fetchProducts } from "@/lib/store/useSaveitem";
import { useState } from "react";
import { FlatList, Text, View, RefreshControl, Pressable } from "react-native";
import { Product } from "./home";
import { useFocusEffect } from "expo-router";

const BooMarke = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [products_, setProducts] = useState<Product[]>([]);
  useFocusEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products as any[]);
      setRefreshing(false);
    };

    loadProducts();
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts(); // Assuming fetchProducts is an async function
    setRefreshing(false);
  };

  return (
    <View className="flex-1">
      <FlatList
        numColumns={2}
        ListEmptyComponent={
          <Text
            style={{ color: "#292929", fontFamily: "Cairo-ExtraBold" }}
            className=" text-center mt-20"
          >
            لا توجد منتجات
          </Text>
        }
        data={products_}
        renderItem={({ item }) => <Cart products={item} />}
        keyExtractor={(item) => item.id as any}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default BooMarke;
