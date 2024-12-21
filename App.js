import React, { useState, useEffect } from 'react';

import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/config/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';


export const PreferencesContext = React.createContext({
  toggleTheme: () => { },
  isThemeDark: false,
});


const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <AppNavigator theme={theme} />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  // FONTS

  margins: {
    screenTop: 50,
    screenBottom: 20,
    screenHorizontal: 80,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    FONT_SIZE_EXTRA_LARGE: 33,
    FONT_SIZE_LARGE: 25,
    FONT_SIZE_MEDIUM: 20,
    FONT_SIZE_SMALL: 16,

    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_HEAVY: 800,
  },
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    // COLORS
    FONT_COLOR_PRIMARY: '#000000',
    FONT_COLOR_SECONDARY: '#ffffff',
    FONT_COLOR_TERTIARY: '#1AF149',
    FONT_COLOR_QUATERNARY: '#333333',
    BACKGROUND_COLOR_PRIMARY: '#D9D9D9',
    POSITIVE_NUMBER_COLOR: "#17B439",
    NEGATIVE_NUMBER_COLOR: "#E1200F",
    pencil:"#FFFF00",

  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,


  margins: {
    screenTop: 50,
    screenBottom: 20,
    screenHorizontal: 80,
  },

  fonts: {
    ...MD3DarkTheme.fonts,
    FONT_SIZE_EXTRA_LARGE: 33,
    FONT_SIZE_LARGE: 25,
    FONT_SIZE_MEDIUM: 20,
    FONT_SIZE_SMALL: 16,

    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_HEAVY: 800,
  },

  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,

    FONT_COLOR_PRIMARY: '#000000',
    FONT_COLOR_SECONDARY: '#ffffff',
    FONT_COLOR_TERTIARY: '#1AF149',
    FONT_COLOR_QUATERNARY: '#333333',
    BACKGROUND_COLOR_PRIMARY: '#D9D9D9',
    POSITIVE_NUMBER_COLOR: "#17B439",
    NEGATIVE_NUMBER_COLOR: "#E1200F",
    pencil:"#FFFF00",
  },
};

export default App;
