import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import LoadingPage from "@/components/ui/LoadingPage";
import Cart from "@/components/ui/Cart";
import { getProdctsFromFirebase } from "@/lib/firebase/Serves";
import { ar } from "@/lib/lang/ar";

export interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  images: string[];
}

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tagle, setTagle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await getProdctsFromFirebase();
        const products = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Product[];
        setData(products);
        setFilteredData(products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [tagle]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={ar.searchInPRoducts}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>{ar.search}</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <FlatList
          numColumns={2}
          data={filteredData}
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
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background color for the entire screen
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    alignContent: "center",
    marginTop: 30,
  },
  searchInput: {
    flex: 1,
    height: 56,
    fontFamily: "Cairo-ExtraBold",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Cairo-ExtraBold",
  },
  listContainer: {
    paddingBottom: 20,
    // Adjust padding for the FlatList container
  },
});

export default Home;
