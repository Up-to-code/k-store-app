import { Link, Tabs } from "expo-router";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { ar } from "@/lib/lang/ar";
import { Text } from "react-native";
import { COLORS } from "@/hooks/colors";
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => {
          return (
            <Link href="/search"  className=" right-5"> 
            <Ionicons className="mx-3" name="search" size={24} color="black" style={{ marginRight: 20 }} />
         </Link> );
        },
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 55,
          shadowColor: "#5959594b",
          shadowOffset: {
            width: 0,
            height: 2,

          },
           position: "absolute",
          bottom: 15,
          backgroundColor: "white",
          borderRadius: 15,
          width: "90%",
          marginHorizontal: "5%",
      
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: (e) => (
            <Text
              className="text-end"
              style={{ fontSize: 18, fontFamily: "Cairo-ExtraBold" }}
            >
              {ar.home}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Entypo name="home" size={27} color={COLORS.primary} />
                ) : (
                  <Entypo name="home" size={27} color={COLORS.black} />
                )}
              </>
            );
          },
        }}
      />

      <Tabs.Screen
        name="BooMarke"
        options={{
          headerTitle: (e) => (
            <Text
              className="text-end"
              style={{ fontSize: 18, fontFamily: "Cairo-ExtraBold" }}
            >
              {ar.bookmarks}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <AntDesign name="heart" size={27} color={COLORS.primary} />
                ) : (
                  <AntDesign name="heart" size={27} color={COLORS.black} />
                )}
              </>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerTitle: (e) => (
            <Text
              className="text-end"
              style={{ fontSize: 18, fontFamily: "Cairo-ExtraBold" }}
            >
              {ar.profile}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <AntDesign name="user" size={27} color={COLORS.primary} />
                ) : (
                  <AntDesign name="user" size={27} color={COLORS.black} />
                )}
              </>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
