import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountsScreen from '../screens/AccountsScreen.js';
import TransactionsScreen from '../screens/TransactionsScreen.js';
import TransactionDetailScreen from '../screens/TransactionDetailScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return(
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={AccountsStackNavigator} options={{ headerShown: false }}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
}

function AccountsStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetailScreen} options={{
          title: 'Details',
        }} />
        </Stack.Navigator>
    );
}

export default AppNavigator