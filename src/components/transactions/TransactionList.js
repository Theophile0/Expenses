import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import TransactionItem from "./TransactionItem.js";
import {transactions} from "../../../data/transactions.js";
import {styles} from '../accounts/AccountList.js';
import { GetCategory } from "../../services/categoryService.js";
import { GetSubCategory } from "../../services/subCategoryService.js";

const TransactionList = (accountId) => {

    const renderItem = ({item}) => <TransactionItem 
        date={item.Date} 
        category={GetCategory(item.CategoryId).Name}  
        subcategory={GetSubCategory(item.SubCategoryId).Name}  
        amount={item.Amount} 
        image={GetCategory(item.CategoryId).Image}
    />;
        
    return(
    <View style={styles.container}>
        <Text style={styles.title}>{"Transactions"}</Text>
                <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.TransactionId.toString()}/>
    </View>
    )
}


export default TransactionList;