import { View, StyleSheet, FlatList,} from "react-native";
import AccountItem from "./AccountItem.js";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

const AccountList = (props) => {
    const {navigation} = props;
    const [accounts, setAccounts] = useState([]);
    const theme = useTheme()
    const styles = getStyles(theme);

    useEffect(() => {
        
              fetch('http://10.10.10.177:8080/api/accounts')
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
const getStyles = (theme) => StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: theme.SCREEN_HORIZONTAL_MARGIN,
    },
})

export default AccountList;