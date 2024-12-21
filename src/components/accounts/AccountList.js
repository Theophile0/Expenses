import React from 'react'
import { View, StyleSheet, FlatList, Dimensions, RefreshControl, Platform } from "react-native";
import AccountItem from "./AccountItem.js";
import { useEffect, useState } from "react";
import { useTheme, ActivityIndicator, Searchbar } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import AddEntityButton from '../shared/AddEntityButton.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const itemWidth = Dimensions.get('window').width


const AccountList = (props) => {
  const { navigation } = props;
  const apiUrl = process.env.EXPO_API_URL
  console.log(apiUrl)
  const theme = useTheme()
  const styles = getStyles(theme);

  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [animating, setAnimating] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fabDisabled, setFabDisabled] = useState(true);




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
    setFabDisabled(true)

    setTimeout(() => {
      fetchAccounts();
      setRefreshing(false);
    }, 300);
  }, []);


  const fetchAccounts = () => {
    fetch(`${apiUrl}/accounts`)
      .then(response => response.json())
      .then(data => {
        setAccounts(data);
        setFilteredAccounts(data)
        setAnimating(false);
        setRefreshing(false)
        setFabDisabled(false)
      })
      .catch(error => {
        setFetchError(true)
        setRefreshing(false)
      });
  }


  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = accounts.filter(
      account => account.name.toLowerCase().includes(query.toLowerCase()) ||
      account.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAccounts(filtered);
  };

  const deleteAccount = (accountId)=>{
    fetch(`${apiUrl}/accounts/${accountId}`, {
      method: 'DELETE'
    })
    .then(response =>{
      if(response.ok){
        setAccounts(oldAccounts =>oldAccounts.filter(account => account.id !== accountId));
        setFilteredAccounts(oldFilterdAccounts => oldFilterdAccounts.filter(account => account.id !== accountId));
      } else{
        alert('Account could not be deleted')
      }
    })
    .catch(error =>{
      alert('Account could not be deleted')
    })
  }



  const renderItem = ({ item }) => <AccountItem
    title={item.name}
    type={item.type}
    accountBalance={item.balance.toString()}
    image={item.image}
    accountId={item.id}
    navigation={navigation}
    onDelete={() => deleteAccount(item.id)}
    onEdit={() => navigation.navigate('AccountEdit', {accountId: item.id})}
  />;


  if (animating) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
        <AddEntityButton disabled={fabDisabled} action={() => navigation.navigate('AddAccount')} />

      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <View  style={styles.dateInputContainer}>
        <View style={styles.searchBar}>
            <Searchbar 
      placeholder="Search title / type" 
      onChangeText={handleSearch} 
      value={searchQuery} 
    />
            </View>
        </View>
        <FlatList
          style={styles.list}
          data={filteredAccounts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        <AddEntityButton disabled={fabDisabled} action={() => navigation.navigate('AddAccount')} />
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
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    margin: 18,
    width: '100%',
},
  searchIcon:{
    display:'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  
  searchBar: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    alignContent:'center',
    
    paddingHorizontal:15,
    color:'black',
  },
})

export default AccountList;