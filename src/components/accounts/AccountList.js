import React from 'react'
import { View, StyleSheet, FlatList, Dimensions, RefreshControl } from "react-native";
import AccountItem from "./AccountItem.js";
import { useEffect, useState } from "react";
import { useTheme, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import AddEntityButton from '../shared/AddEntityButton.js';

const itemWidth = Dimensions.get('window').width


const AccountList = (props) => {
  const { navigation } = props;
  const apiUrl = process.env.EXPO_API_URL
  const [accounts, setAccounts] = useState([]);
  const [animating, setAnimating] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme()
  const styles = getStyles(theme);

  useFocusEffect(
    React.useCallback(() => {
      setFetchError(false)
        fetchAccounts();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setAccounts([]);
    setAnimating(true);
    setTimeout(() => {
      fetchAccounts();
      setRefreshing(false);
    }, 300);
  }, []);
  

  const fetchAccounts = () =>{
    fetch(`${apiUrl}/accounts`)
        .then(response => response.json())
        .then(data => {
          setAccounts(data);
          setAnimating(false);
          setRefreshing(false)
        })
        .catch(error => {
          setFetchError(true)
          setRefreshing(false)
        });
  }


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
  <AddEntityButton action={() => navigation.navigate('AddAccount' )} />

</View>
)  }
  else {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={accounts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
        <AddEntityButton action={() => navigation.navigate('AddAccount' )} />
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