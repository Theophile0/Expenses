import react from 'react';
import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from "react-native";
import { GetTransaction } from '../../services/transactionService'; 

const TransactionEditor = (props) => {
    const {navigation, route} = props;
    const {transactionId} = route.params;
    const transaction = GetTransaction(transactionId);
    
    return (
        <View>
            <Text>This is the editor</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20
    }
})

export default TransactionEditor;