import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountList from './src/components/accounts/AccountList';
import TransactionList from './src/components/transactions/TransactionList';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={"lightContent"}></StatusBar>
      <TransactionList></TransactionList>
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
