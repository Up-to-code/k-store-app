import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";
import { useGlobalSearchParams } from "expo-router";
import { getProdctFomFirebaseUsingId } from "@/lib/firebase/Serves";
import { Product } from "../(app)/home";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addProduct,
  getOneProduct,
  removeProduct,
} from "@/lib/store/useSaveitem";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/hooks/colors";

const { width } = Dimensions.get("screen");

const ShowProduct: React.FC = () => {
  const { id } = useGlobalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<any>();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProdctFomFirebaseUsingId(id as string);
        setProduct(response as Product);
      } catch (error) {
        setError("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchProduct = async () => {
      const Pro = getOneProduct(id as string);
      setIsSaved(Pro);
    };
    fetchProduct();
  }, [id, product]);
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          loop={true}
          autoplay={true}
          loadMinimalSize={2}
          paginationStyle={styles.pagination}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          buttonWrapperStyle={styles.buttonWrapper}
        >
          {product.images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>
        <View style={styles.detailsContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>{product.title}</Text>
            <Pressable
              onPress={() => {
                setIsSaved(!isSaved);
                if (isSaved) {
                  removeProduct(id as string);
                } else {
                  addProduct(product);
                }
              }}
            >
              {isSaved ? (
                <AntDesign name="heart" size={27} color={COLORS.primary} />
              ) : (
                <AntDesign name="heart" size={27} color={COLORS.secondary} />
              )}
            </Pressable>
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    bottom: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  container: {
    flexGrow: 1,

    paddingBottom: 20,
  },
  wrapper: {
    height: width,
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: width * 0.75,
    resizeMode: "cover",
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 20,
    color: "#ff6347",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  buttonWrapper: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 10,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ShowProduct;
