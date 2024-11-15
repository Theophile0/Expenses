import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import AccountItem from "./AccountItem.js";
import {accounts} from "../../../data/accounts.js";
import theme from '../../styles/theme.js';


const AccountList = (props) => {
    const {navigation} = props;
    const renderItem = ({item}) => <AccountItem 
        title={item.AccountTitle} 
        type={item.AccountType} 
        accountNumber={item.AccountNumber} 
        accountBalance={item.AccountBalance} 
        image={item.AccountImage}
        accountId={item.AccountId}
        navigation={navigation}
        />;
    return (
        <View style={styles.container}>
                    <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={item => item.AccountId.toString()}
            contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}/>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: theme.SCREEN_HORIZONTAL_MARGIN,
    },
})

export default AccountList;