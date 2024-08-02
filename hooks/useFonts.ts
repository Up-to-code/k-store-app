import * as Font from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded] = Font.useFonts({
    'Cairo-Bold': require('../assets/fonts/Cairo-Bold.ttf'),
    'Cairo-ExtraBold': require('../assets/fonts/Cairo-ExtraBold.ttf'),
    'Cairo-Medium': require('../assets/fonts/Cairo-Medium.ttf'),
  });

  return fontsLoaded;
};