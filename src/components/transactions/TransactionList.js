import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import TransactionItem from "./TransactionItem.js";
import {styles} from '../accounts/AccountList.js';
import AddTransactionButton from './AddTransactionButton.js';
import { useEffect, useState } from "react";

const TransactionList = (props) => {
    const {navigation, route} = props;
    const {accountId} = route.params;
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    useEffect(() => {
        fetch(`http://10.10.10.177:8080/api/transactions/accounts/${accountId}`)
        .then(res => res.json())
        .then(data =>{
            setTransactions(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`http://10.10.10.177:8080/api/categories`)
        .then(res => res.json())
        .then(data =>{
            setCategories(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`http://10.10.10.177:8080/api/subcategories`)
        .then(res => res.json())
        .then(data =>{
            setSubCategories(data)
        })
        .catch()
    }, []);

    const getCategory = (categoryId) =>{
        return categories.find(category => category.id === categoryId);
    }

    const getSubCategory = (subCategoryId) =>{
        return subcategories.find(subcategory => subcategory.id === subCategoryId)
    }

    

    const renderItem = ({item}) => {
          const subCategory = getSubCategory(item.subCategoryId);
        const category = subCategory ? getCategory(subCategory.categoryId) : null;
    console.log(item)
    return(
    <TransactionItem 
        date={item.date} 
        category={category ? category.name: "Uncategorized"}  
        subcategory={subCategory ? subCategory.name: "Uncategorized"}  
        amount={item.amount} 
        image={category?.icon ? category.icon: "https://thenounproject.com/browse/icons/term/broken-image/"}
        transactionId={item.id} 
        navigation={navigation} 
    />
    );
};
    
    
 
    return(
    <View>
        <View style={styles.container}>
            <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}/>
        </View>
        <AddTransactionButton navigation={navigation} route={route} accountId={accountId}></AddTransactionButton>
    </View>
    )
}


export default TransactionList;