import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import AccountItem from "./AccountItem.js";
import {accounts} from "../../../data/accounts.js";
import theme from '../../styles/theme.js';


const AccountList = (props) => {
    const renderItem = ({item}) => <AccountItem 
        title={item.AccountTitle} 
        type={item.AccountType} 
        accountNumber={item.AccountNumber} 
        accountBalance={item.AccountBalance} 
        image={item.AccountImage}/>;
        
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Accounts"}</Text>
                    <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={item => item.AccountId.toString()}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.SCREEN_TOP_MARGIN,
        marginHorizontal: theme.SCREEN_HORIZONTAL_MARGIN,
    },
    title:{
        fontSize: theme.FONT_SIZE_EXTRA_LARGE
    },
})

export default AccountList;