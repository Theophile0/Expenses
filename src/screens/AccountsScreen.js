import AccountList from '../components/accounts/AccountList';
import TransactionList from '../components/transactions/TransactionList';
import {View, StyleSheet} from 'react-native';


const AccountsScreen = (props) =>{
    const { navigation } = props;
    return(
        <View style={styles.container}>
            
            <AccountList navigation={navigation}></AccountList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AccountsScreen;