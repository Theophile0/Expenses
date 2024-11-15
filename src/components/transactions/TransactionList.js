import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import TransactionItem from "./TransactionItem.js";
import {styles} from '../accounts/AccountList.js';
import { GetCategory } from "../../services/categoryService.js";
import { GetSubCategory } from "../../services/subCategoryService.js";
import AddTransactionButton from './AddTransactionButton.js';
import {GetTransactions } from "../../services/transactionService.js";

const TransactionList = (props) => {
    const {navigation, route} = props;
    const {accountId} = route.params;
    console.log("Dit is het accountId" + accountId)

    const renderItem = ({item}) => <TransactionItem 
        date={item.Date} 
        category={GetCategory(item.CategoryId, ).Name}  
        subcategory={GetSubCategory(item.SubCategoryId).Name}  
        amount={item.Amount} 
        image={GetCategory(item.CategoryId).Image}
        transactionId={item.TransactionId} 
        navigation={navigation} 
    />;
    
    return(
    <View>
        <View style={styles.container}>
            <FlatList
            data={GetTransactions(accountId)}
            renderItem={renderItem}
            keyExtractor={item => item.TransactionId.toString()}/>
        </View>
        <AddTransactionButton navigation={navigation} route={route} accountId={accountId}></AddTransactionButton>
    </View>
    )
}


export default TransactionList;