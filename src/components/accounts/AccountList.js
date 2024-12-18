import React from 'react'
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import AccountItem from "./AccountItem.js";
import { useEffect, useState } from "react";
import { useTheme, ActivityIndicator } from "react-native-paper";
import AddAccountButton from "./AddAccountButton.js";
import { useFocusEffect } from '@react-navigation/native';

const itemWidth = Dimensions.get('window').width


const AccountList = (props) => {
  const { navigation } = props;
  const apiUrl = process.env.EXPO_API_URL
  console.log(apiUrl)
  const [accounts, setAccounts] = useState([]);
  const [animating, setAnimating] = useState(true);
  const theme = useTheme()
  const styles = getStyles(theme);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${apiUrl}/accounts`)
        .then(response => response.json())
        .then(data => {
          setAccounts(data);
          setAnimating(false);
        })
        .catch(error => {
          console.error('Error fetching accounts:', error);
        });
    }, [])
  );


  const renderItem = ({ item }) => <AccountItem
    title={item.name}
    type={item.type}
    accountBalance={item.balance.toString()}
    image={item.image}
    accountId={item.id}
    navigation={navigation}
  />;


  if (animating) {
    return (
<View style={styles.activityIndicator}>
  <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
</View>
)  }
  else {
    return (
      <View style={styles.container}>
        <FlatList
          data={accounts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }} />
        <AddAccountButton navigation={navigation} />
      </View>
    )

  }

}
const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
})

export default AccountList;