import React from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import TransactionItem from "./TransactionItem.js";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import {ActivityIndicator} from "react-native-paper";
import { RefreshControl } from "react-native";
import AddEntityButton from "../shared/AddEntityButton.js";

const TransactionList = (props) => {
    const { navigation, route } = props;
    const { accountId } = route.params;
    const apiUrl = process.env.EXPO_API_URL
    const [animating, setAnimating] = useState(true)
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

      const [fetchError, setFetchError] = useState(false);
      const [refreshing, setRefreshing] = useState(false);
    const theme = useTheme();
    const styles = getStyles(theme);


    const fetchTransactions = () =>{
        fetch(`${apiUrl}/transactions/accounts/${accountId}`)
                .then(res => res.json())
                .then(data => {
                    setTransactions(data)
                    setAnimating(false)
                    setRefreshing(false)
                    setFetchError(false);
                })
                .catch( error =>{
                    setFetchError(true);
                    setAnimating(false);
                    setRefreshing(false)
                }  
                )
    }

    const fetchCategories = () => {
        fetch(`${apiUrl}/categories`)
                .then(res => res.json())
                .then(data => {
                    setCategories(data)
                })
                .catch()
    }

    const fetchSubCategories = () => {
        fetch(`${apiUrl}/subcategories`)
                .then(res => res.json())
                .then(data => {
                    setSubCategories(data)
                })
                .catch()
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTransactions([]);
        setAnimating(true);
        setTimeout(() => {
          fetchTransactions();
          fetchCategories();
          fetchSubCategories();
          setRefreshing(false);
        }, 300);
      }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchTransactions();
            fetchCategories();
            fetchSubCategories();
        }, [])
    );

    

    const getCategory = (categoryId) => {
        return categories.find(category => category.id === categoryId);
    }

    const getSubCategory = (subCategoryId) => {
        return subcategories.find(subcategory => subcategory.id === subCategoryId)
    }

    const renderItem = ({ item }) => {
        const subCategory = getSubCategory(item.subCategoryId);
        const category = subCategory ? getCategory(subCategory.categoryId) : null;
        return (
            <TransactionItem
                date={item.date}
                category={category ? category.name : "Uncategorized"}
                subcategory={subCategory ? subCategory.name : "Uncategorized"}
                amount={item.amount}
                image={category?.icon ? category.icon : ""}
                transactionId={item.id}
                navigation={navigation}
            />
        );
    };


    if (animating) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
                <AddEntityButton navigation={navigation} route={route} accountId={accountId} action={() => navigation.navigate('AddTransaction')}/>

            </View>
        )
    } else {
        return (
           
                <View style={styles.container}>
                    <FlatList
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }} 
                                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        
                        /> 
                <AddEntityButton action={() => navigation.navigate('AddTransaction')}/>
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


export default TransactionList;