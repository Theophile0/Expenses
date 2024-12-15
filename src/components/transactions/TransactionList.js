import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import TransactionItem from "./TransactionItem.js";
import AddTransactionButton from './AddTransactionButton.js';
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { Dimensions } from "react-native";

const itemWidth = Dimensions.get('window').width

const TransactionList = (props) => {
    const {navigation, route} = props;
    const {accountId} = route.params;
    const apiUrl = process.env.EXPO_BACKEND_API_URL

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const theme = useTheme();
  const styles = getStyles(theme);

    useEffect(() => {
        fetch(`${apiUrl}/transactions/accounts/${accountId}`)
        .then(res => res.json())
        .then(data =>{
            setTransactions(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`${apiUrl}/categories`)
        .then(res => res.json())
        .then(data =>{
            setCategories(data)
        })
        .catch()
    }, []);

    useEffect(() => {
        fetch(`${apiUrl}/subcategories`)
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
const getStyles =(theme) => StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

        margin: 10,
        marginTop: 10,
        width: itemWidth -50,
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.BACKGROUND_COLOR_PRIMARY,
        fontSize: theme.FONT_SIZE_LARGE,
    },
    imageContainer:{
        flex:0.75
    },
    image:{
        width: 50,
        height: 50,
    },
    textContainer:{
        flex:1.25,
        flexWrap: 'nowrap'
    },
    smallText:{
        color: theme.FONT_COLOR_PRIMARY,
        fontSize: theme.FONT_SIZE_SMALL,
        whiteSpace: 'nowrap',
    },
    titleText:{
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontWeight: '500'
    },
    balanceContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    balance:{
        fontSize: theme.FONT_SIZE_LARGE,
    },
    balancePositive:{
        color: theme.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative:{
        color: theme.NEGATIVE_NUMBER_COLOR,
    },
})

export default TransactionList;