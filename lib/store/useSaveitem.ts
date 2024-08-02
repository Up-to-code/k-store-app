import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, FlatList, Text, Button } from "react-native";
import { Product } from "@/app/(app)/home";

// Define the storage key
const STORAGE_KEY = "products";

// Function to fetch products from AsyncStorage
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const products = await AsyncStorage.getItem(STORAGE_KEY);
    if (products === null) {
      return [];
    }
    return JSON.parse(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Function to add a product to AsyncStorage
export const addProduct = async (product: Product): Promise<void> => {
  try {
    const products = await fetchProducts();
    // Check if the product already exists
    const existingProductIndex = products.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      // If product exists, update it
      products[existingProductIndex] = product;
    } else {
      // If product does not exist, add it
      products.push(product);
    }

    console.log("Products before saving:", products);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    console.log("Product saved successfully.");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Function to remove a product from AsyncStorage
export const removeProduct = async (id: string): Promise<void> => {
  try {
    const products = await fetchProducts();
    const updatedProducts = products.filter(
      (product) => product.id as any !== id
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

export const clearProducts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing products:", error);
  }
};

export const getOneProduct = async (id: string): Promise<Product | undefined> => {
  try {
    const products = await fetchProducts();
    const product = products.find((product) => product.id as any === id);

    if (!product) {
      return undefined;
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
