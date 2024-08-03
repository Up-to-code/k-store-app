// useSaveitem.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/app/(app)/home";

export const addProduct = async (
  product: Product,
  id: string
): Promise<void> => {
  try {
    let savedProducts = await AsyncStorage.getItem("savedProducts");
    let parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];

    // Check if the product is already saved
    const isProductAlreadySaved = parsedProducts.some(
      (item: Product) => item.id === id
    );

    if (!isProductAlreadySaved) {
      parsedProducts.push({ ...product, id });
      await AsyncStorage.setItem(
        "savedProducts",
        JSON.stringify(parsedProducts)
      );
    }
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

export const getOneProduct = async (id: string): Promise<Product | null> => {
  try {
    let savedProducts = await AsyncStorage.getItem("savedProducts");
    let parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];
    return parsedProducts.find((product: Product) => product.id === id) || null;
  } catch (error) {
    console.error("Error getting saved product:", error);
    return null;
  }
};

export const removeProduct = async (id: string): Promise<void> => {
  try {
    let savedProducts = await AsyncStorage.getItem("savedProducts");
    let parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];
    parsedProducts = parsedProducts.filter(
      (product: Product) => product.id !== id
    );
    await AsyncStorage.setItem("savedProducts", JSON.stringify(parsedProducts));
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    let savedProducts = await AsyncStorage.getItem("savedProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  } catch (error) {
    console.error("Error getting all saved products:", error);
    return [];
  }
};
export const clearAllProducts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("savedProducts");
  } catch (error) {
    console.error("Error clearing all saved products:", error);
  }
};
