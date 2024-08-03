import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import {
  Text,
  List,
  Divider,
  useTheme,
  Dialog,
  Portal,
  Button,
  Card,

} from "react-native-paper";
import { FIREBASE_AUTH } from "@/lib/firebase/FirebaseConfig";
import { useFocusEffect, router } from "expo-router";
import { ar } from "@/lib/lang/ar"; // Import translations
import { useFonts } from "@/hooks/useFonts"; // Import the custom hook
import { clearAllProducts } from "@/lib/store/useSaveitem";

const Profile: React.FC = () => {
  const { colors } = useTheme();
  const fontsLoaded = useFonts(); // Check if fonts are loaded
  const [user, setUser] = useState(FIREBASE_AUTH.currentUser);
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const texts = language === "ar" ? ar : ar; // Add more translations as needed

  useEffect(() => {
    I18nManager.forceRTL(language === "ar");
  }, [language]);

  useFocusEffect(() => {
    const handleAuthChange = () => {
      setUser(FIREBASE_AUTH.currentUser);
    };
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  });

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await FIREBASE_AUTH.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  const showLogoutDialog = () => {
    setLogoutDialogVisible(true);
  };

  const hideLogoutDialog = () => {
    setLogoutDialogVisible(false);
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{texts.loading}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{texts.loading}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.noUserContainer}>
        <Text style={styles.noUserText}>{texts.no_user_signed_in}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1673901938351-9edacbbf8eb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.headerImage}
        />
        <View style={styles.container}>
          {user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <Text style={styles.nameText}>{user.displayName || texts.name}</Text>
          <Text style={styles.emailText}>{user.email || texts.email}</Text>
           <Card style={styles.card}>
          <Card.Content>
           <Text style={{
            fontFamily: "Cairo-ExtraBold",
            fontSize: 18,
            textAlign: "right",
           }}>
              {texts.samTimeProfileTakesTime}
            </Text>
          
          </Card.Content>
        </Card>
          <List.Section>
            <List.Item
              title={() => (
                <Text style={styles.TextFont}>{texts.edit_profile}</Text>
              )}
              left={() => <List.Icon icon="account-edit" />}
              onPress={() => router.push("/settings")}
              style={styles.listItem}
            />
            <Divider />
            <List.Item
              title={() => <Text style={styles.TextFont}>{texts.signout}</Text>}
              left={() => <List.Icon icon="logout" />}
              onPress={showLogoutDialog}
              titleStyle={{ color: colors.error }}
              style={styles.listItem}
            />
          </List.Section>
          <Divider />
          <List.Section title={texts.language}>
            <List.Item
              title={() => (
                <Text style={styles.TextFont}>{texts.language}</Text>
              )}
              description={language === "en" ? texts.english : texts.arabic}
              left={() => <List.Icon icon="translate" />}
              style={styles.listItem}
            />
            <Divider />
            <List.Item
              onPress={() => router.push("/BooMarke")}
              title={() => (
                <Text style={styles.TextFont}>{texts.bookmarks}</Text>
              )}
              left={() => <List.Icon icon="bookmark-outline" />}
              style={styles.listItem}
            />

            <Divider />
            <List.Item
              title={() => (
                <Text style={styles.TextFont}>{texts.contact_us}</Text>
              )}
              left={() => <List.Icon icon="email-outline" />}
              style={styles.listItem}
            />
            <Divider />

            <List.Item
              onPress={() => clearAllProducts()}
              title={() => (
                <Text style={styles.TextFont}>{texts.clear_cache}</Text>
              )}
              left={() => <List.Icon icon="trash-can" />}
              style={styles.listItem}
            />
            <Divider />

            <List.Item
              title={() => (
                <Text style={styles.TextFont}>{texts.privacy_policy}</Text>
              )}
              left={() => <List.Icon icon="file-document-outline" />}
              style={styles.listItem}
            />
          </List.Section>
        </View>
      </ScrollView>

      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={hideLogoutDialog}>
          <Dialog.Title>{texts.signout}</Dialog.Title>
          <Dialog.Content>
            <Text>{texts.logout_confirmation}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideLogoutDialog}>{texts.cancel}</Button>
            <Button onPress={handleSignOut}>{texts.yes}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    direction: I18nManager.isRTL ? "rtl" : "ltr",
  },

  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  container: {
    alignItems: "center",
    padding: 16,
    marginTop: -100,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  card : {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Cairo-Bold",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    fontFamily: "Cairo-Medium",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 8,
    fontFamily: "Cairo-Medium",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  noUserContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  noUserText: {
    fontSize: 18,
    color: "#333",
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: "Cairo-Medium",
    marginBottom: 16,
  },
  listItem: {
    width: "100%",
    fontFamily: "Cairo-Bold",
    fontSize: 18,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  TextFont: {
    fontFamily: "Cairo-Medium",
    fontSize: 18,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});

export default Profile;
