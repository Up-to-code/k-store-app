import Cart from "@/components/ui/Cart";
import {  getAllProducts } from "@/lib/store/useSaveitem";
import { useEffect, useState } from "react";
import { FlatList, Text, View, RefreshControl, Pressable } from "react-native";
import { Product } from "./home";

const BooMarke = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [products_, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      const products = await getAllProducts();
      setProducts(products as any[]);
      
      setRefreshing(false);
    };

    loadProducts();
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllProducts(); // Assuming fetchProducts is an async function
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
