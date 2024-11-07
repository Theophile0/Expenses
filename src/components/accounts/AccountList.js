import {Text, View, StyleSheet, FlatList} from "react-native";
import AccountItem from "./AccountItem.js";
import {accounts} from "../../../data/accounts.js";
import theme from '../../styles/theme.js';


const AccountList = (props) => {
    const renderItem = ({item}) => <AccountItem 
        title={item.AccountTitle} 
        type={item.AccountType} 
        accountNumber={item.accountNumber} 
        accountBalance={item.AccountBalance} 
        image={item.image}/>;
        
    return (
        <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={item => item.AccountId.toString()}/>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.BACKGROUND_COLOR_PRIMARY,
        

    }
})

export default AccountList;