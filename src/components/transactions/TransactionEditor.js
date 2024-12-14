import react, { useEffect } from 'react';
import {Text, View, StyleSheet, Dimensions, DatePicker, Image,TouchableOpacity} from "react-native";
import { GetTransaction } from '../../services/transactionService'; 
import { useState } from 'react';
import { TextInput } from 'react-native-web';
import { useTheme } from "react-native-paper";

const theme = useTheme();



const TransactionEditor = (props) => {
    const theme = useTheme();
  const styles = getStyles(theme);
    const {navigation, route} = props;
    const {transactionId} = route.params;
    const [transaction, setTransaction] = useState();
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [subCategory, setSubCategory] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/transactions/${transactionId}`)
        .then(res => res.json())
        .then(data => {
            setTransaction(data)
            setAmount(transaction.amount);
            setDescription(transaction.description)
        })
        .catch()
    });

    useEffect(()=>{
        fetch(`http://localhost:8080/api/subcategory/${transactionId.subCategoryId}`)
        .then(res =>res.json())
        .then(data => {
            setSubCategory(data)
        }).catch()
    })

    useEffect(()=>{
        fetch(`http://localhost:8080/api/category/${subCategory.categoryId}`)
        .then(res =>res.json())
        .then(data => {
            setCategory(data)
        })
    })


    
    
    return (
        <View>
             <TextInput
            placeholder='Amount'
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
            />
            <DatePicker
        date={date}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={setDate}
        /> 
        <Text>This is the editor screen</Text>
        </View>
    )
}
 

const getStyles =(theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20
    }
})

export default TransactionEditor;