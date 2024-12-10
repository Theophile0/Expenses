import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import AccountItem from "./AccountItem.js";
import theme from '../../styles/theme.js';
import { useEffect, useState } from "react";


const AccountList = (props) => {
    const {navigation} = props;
    const [accounts, setAccounts] = useState([]);
   

    useEffect(() => {
        
              fetch('http://localhost:8080/api/accounts')
              .then(res => res.json())
              .then(data => {
                setAccounts(data)
              })
              .catch()      
        }, []);


    const renderItem = ({item}) => <AccountItem 
        title={item.name} 
        type={item.type} 
        accountBalance={item.balance.toString()} 
        image={item.image}
        accountId={item.id}
        navigation={navigation}
        />;

    return (
        <View style={styles.container}>
                    <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}/>
        </View>   
    );
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