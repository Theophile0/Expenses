import TransactionList from '../components/transactions/TransactionList';
import {View, StyleSheet} from 'react-native';

const TransactionsScreen = (props) =>{
    const { navigation, route } = props;
    return(
        <View style={styles.container}>
            <TransactionList navigation={navigation} route={route}></TransactionList>  
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});
export default TransactionsScreen;