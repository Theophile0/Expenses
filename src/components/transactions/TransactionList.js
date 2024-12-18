import React from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import TransactionItem from "./TransactionItem.js";
import AddTransactionButton from './AddTransactionButton.js';
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {ActivityIndicator} from "react-native-paper";




const itemWidth = Dimensions.get('window').width

const TransactionList = (props) => {
    const { navigation, route } = props;
    const { accountId } = route.params;
    const apiUrl = process.env.EXPO_API_URL
    const [animating, setAnimating] = useState(true)
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const theme = useTheme();
    const styles = getStyles(theme);
    console.log("transactionsapiurl: " + `${apiUrl}/transactions/accounts/${accountId}`)

    useFocusEffect(
        React.useCallback(() => {
            console.log(accountId)
            fetch(`${apiUrl}/transactions/accounts/${accountId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setTransactions(data)
                    setAnimating(false)
                })
                .catch( error =>{
                    console.error('Error fetching transactions:', error)
                    setAnimating(false);
                }
                    
                )
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            fetch(`${apiUrl}/categories`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    setCategories(data)
                })
                .catch()
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            fetch(`${apiUrl}/subcategories`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    setSubCategories(data)
                })
                .catch()
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
        console.log(item)
        return (
            <TransactionItem
                date={item.date}
                category={category ? category.name : "Uncategorized"}
                subcategory={subCategory ? subCategory.name : "Uncategorized"}
                amount={item.amount}
                image={category?.icon ? category.icon : "../../../assets/broken-image.png"}
                transactionId={item.id}
                navigation={navigation}
            />
        );
    };


    if (animating) {
        return (
            <ActivityIndicator animating={animating} color={theme.colors.onBackground} />)
    } else {
        return (
           
                <View style={styles.container}>
                    {console.log("rendered")
                    /* <FlatList
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }} /> */}
                    <AddTransactionButton navigation={navigation} route={route} accountId={accountId}/>
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
})


export default TransactionList;