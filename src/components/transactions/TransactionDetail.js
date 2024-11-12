import react from 'react';
import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from "react-native";
import { GetTransaction } from '../../services/transactionService'; 
import theme from '../../styles/theme.js';



const TransactionDetail = (props) => {
    const {navigation, route} = props;
    const {transactionId} = route.params;
    const transaction = GetTransaction(transactionId);
    console.log(transaction.Beneficiary)
    const {Beneficiary, } = transaction
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction Details</Text>
            
            <View style={styles.detailBox}>
                <Text style={styles.label}>Beneficiary:</Text>
                <Text style={styles.value}>{transaction.Beneficiary}</Text>
            </View>
            
            <View style={styles.detailBox}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={[styles.value, transaction.Amount >= 0 ? styles.positiveAmount : styles.negativeAmount]}>
                    € {transaction.Amount.toFixed(2)}
                </Text>
            </View>
            
            <View style={styles.detailBox}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{transaction.Date}</Text>
            </View>
            
            <View style={styles.detailBox}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{transaction.Description}</Text>
            </View>

            <View style={styles.detailBox}>
                <Text style={styles.label}>Account ID:</Text>
                <Text style={styles.value}>{transaction.AccountId}</Text>
            </View>

            <View style={styles.detailBox}>
                <Text style={styles.label}>Category ID:</Text>
                <Text style={styles.value}>{transaction.CategoryId}</Text>
            </View>

            <View style={styles.detailBox}>
                <Text style={styles.label}>Subcategory ID:</Text>
                <Text style={styles.value}>{transaction.SubCategoryId}</Text>
            </View>
            
            
        </View>
    );
};

const itemWidth = Dimensions.get('window').width


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        marginHorizontal: itemWidth/5,
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        color: '#000000',
    },
    positiveAmount: {
        color: '#4CAF50', // green for positive values
    },
    negativeAmount: {
        color: '#E53935', // red for negative values
    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 30,
        alignSelf: 'center',
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TransactionDetail;