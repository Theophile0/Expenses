import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import TransactionItem from "./TransactionItem.js";
import {styles} from '../accounts/AccountList.js';
import { GetCategory } from "../../services/categoryService.js";
import { GetSubCategory } from "../../services/subCategoryService.js";
import AddTransactionButton from './AddTransactionButton.js';
import {GetTransactions } from "../../services/transactionService.js";
import { useEffect, useState } from "react";

const TransactionList = (props) => {
    const {navigation, route} = props;
    const {accountId} = route.params;
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/transactions/accounts/${accountId}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setTransactions(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/categories`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setCategories(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/subcategories`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setSubCategories(data)
        })
        .catch()
    }, []);

    const getCategory = (categoryId) =>{
        var categoryFound = false;
        index = 0;
        while(!categoryFound && index <categories.length){
            if(categories[index].id == categoryId){
                categoryFound = true;
                return categories[index];
            }
            index ++
        }
        return null;
    }

    const getSubCategory = (subCategoryId) =>{
        var subFound = false;
        index = 0;
        while(!subFound && index < subcategories.length){
            if(subcategories[index].id == subCategoryId){
                categoryFound = true;
                return subcategories[index];
            }
            index ++;
            
        }
        return null;
    }

    

    const renderItem = ({item}) => {
          const subCategory = getSubCategory(item.subCategoryId);
        const category = subCategory ? getCategory(subCategory.categoryId) : null;
    
    return(
    <TransactionItem 
        date={item.date} 
        category={category ? category.name: ""}  
        subcategory={subCategory ? subCategory.name: ""}  
        amount={item.amount} 
        image={ null}
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