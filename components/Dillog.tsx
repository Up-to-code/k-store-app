import React from "react";
import { Dialog } from "react-native-simple-dialogs";
import { Linking, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/hooks/colors";
import { ar } from "@/lib/lang/ar";

interface Props {
  visible: boolean;
  url: string;
  setVisible: () => any;
  des?: string;
}

const Dillog = ({ visible, url, setVisible, des }: Props) => {
  const openUrlInChrome = async (url: string) => {
    try {
      // Check if the link can be opened
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Open the link in the default browser
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error("An error occurred while opening the URL:", error);
    }
  };

  return (
    <Dialog
          dialogStyle={styles.dialog}
          visible={visible}
          title={ar.New_update}
          titleStyle={styles.titleStyle}
          onTouchOutside={() => setVisible()} onRequestClose={function (): void {
              throw new Error("Function not implemented.");
          } } contentInsetAdjustmentBehavior={undefined}    >
      <View>
        <Text style={styles.boldText}>{ar.New_update}</Text>
        <Text style={styles.mediumText}>{des}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text
          style={styles.updateText}
          onPress={() => {
            openUrlInChrome(url);
          }}
        >
          {ar.update}
        </Text>
        <Text
          style={styles.cancelText}
          onPress={() => {
            setVisible();
          }}
        >
          {ar.no}
        </Text>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  titleStyle: {
    fontFamily: "Cairo-Bold",
  },
  boldText: {
    fontFamily: "Cairo-Bold",
  },
  mediumText: {
    fontFamily: "Cairo-Medium",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 40,
  },
  updateText: {
    color: COLORS.primary,
    fontFamily: "Cairo-ExtraBold",
    fontSize: 18,
  },
  cancelText: {
    color: COLORS.primary,
    fontFamily: "Cairo-ExtraBold",
    fontSize: 18,
  },
});

export default Dillog;
