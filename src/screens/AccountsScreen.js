import AccountList from '../components/accounts/AccountList';
import TransactionList from '../components/transactions/TransactionList';
import {View} from 'react-native';
const AccountsScreen = (props) =>{
    const { navigation } = props;
    return(
        <View>
            <AccountList navigation={navigation}></AccountList>
        </View>
    )
}

export default AccountsScreen;