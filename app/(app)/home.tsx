import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import LoadingPage from "@/components/ui/LoadingPage";
import Cart from "@/components/ui/Cart";
import {
  check_v_of_app,
  getProdctsFromFirebase,
  v,
} from "@/lib/firebase/Serves";
import Dillog from "@/components/Dillog";
import { fetchProducts } from "@/lib/store/useSaveitem";

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  images: string[];
}

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkup, setCheckout] = useState({
    vvisible: false,
    des: "",
    url: "",
  });
  const [refreshing, setRefreshing] = useState(false);
  const [tagle, setTagle] = useState(false);

  useEffect(() => {
    async function check() {
      const res = await check_v_of_app();
      console.log(res);
      if (!res) {
        return;
      }
      if ((res.v as number) == v) {
        return;
      } else {
        setCheckout({
          vvisible: true,
          des: res.des as string,
          url: res.url as string,
        });
      }
    }
    check();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await getProdctsFromFirebase();
        setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [tagle]);
  const close = () => {
    setCheckout({
      vvisible: false,
      des: "",
      url: "",
    });
  };
  return (
    <View style={styles.container}>
      <Dillog
        visible={checkup.vvisible}
        url={checkup.url}
        des={checkup.des}
        setVisible={close}
      />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <FlatList
          numColumns={2}
          data={data}
          renderItem={({ item }) => <Cart products={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isLoading || refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTagle(!tagle);
                setTimeout(() => {
                  setRefreshing(false);
                }, 2000);
              }}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
