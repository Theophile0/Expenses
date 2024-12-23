import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountsScreen from '../screens/AccountsScreen.js';
import TransactionsScreen from '../screens/TransactionsScreen.js';
import TransactionDetailScreen from '../screens/TransactionDetailScreen.js';
import SettingsScreen from '../components/settings/SettingsScreen.js';
import AdddTransactionScreen from '../screens/AddTransactionScreen.js'
import AddAccountScreen from '../screens/AddAccountScreen.js'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import AddCategoryScreen from '../screens/AddCategoryScreen.js';
import AddSubCategoryScreen from '../screens/AddSubCategoryScreen.js';
import AccountEditScreen from '../screens/AccountEditScreen.js';
import TransactionEditScreen from '../screens/TransactionEditScreen.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = (props) => {
    return(
    <NavigationContainer theme={props.theme}>
        <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={AccountsStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            ),
          }}
        />
          <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
            ),
          }}
        />
        </Tab.Navigator>
      </NavigationContainer>
    )
}

const AccountsStackNavigator =()=> {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="AddAccount" component={AddAccountScreen} options={{title:'Add Account'}}/>
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetailScreen} options={{title: 'Details'}} />
            <Stack.Screen name="AddTransaction" component={AdddTransactionScreen} options={{title: 'New Transaction'}}/>
            <Stack.Screen name="AddCategory" component={AddCategoryScreen} options={{title: 'New Category'}}/>
            <Stack.Screen name="AddSubCategory" component={AddSubCategoryScreen} options={{title: 'New Subcategory'}}/>
            <Stack.Screen name="AccountEdit" component={AccountEditScreen} options={{title: 'Edit account'}}/>
            <Stack.Screen name="TransactionEdit" component={TransactionEditScreen} options={{title: 'Edit transaction'}}/>
        </Stack.Navigator>
    );
}
 
export default AppNavigator