import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/config/AppNavigator.js';

enableScreens();

export default function App() {
  return (
    <>
    <StatusBar style="auto"></StatusBar>
      <AppNavigator />
      </>
  );
}
