import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="sign-in" />

      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default Layout;
