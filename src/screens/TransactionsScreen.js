import TransactionList from '../components/transactions/TransactionList';
import {View} from 'react-native';
const TransactionsScreen = (props) =>{
    const { navigation, route } = props;
    console.log(route);
    return(
        <View>
            <TransactionList navigation={navigation} route={route}></TransactionList>
        </View>
    )
}

export default TransactionsScreen;