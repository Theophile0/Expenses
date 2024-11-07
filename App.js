import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountList from './src/components/accounts/AccountList';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={"lightContent"}></StatusBar>
      <AccountList></AccountList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
