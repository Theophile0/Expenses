import { View, StyleSheet, FlatList, } from "react-native";
import AccountItem from "./AccountItem.js";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import AddAccountButton from "./AddAccountButton.js";
import WaitingComponent from "../shared/waitingComponent.js";


const AccountList = (props) => {
    const { navigation } = props;
    const apiUrl = process.env.EXPO_API_URL
    console.log(apiUrl)
    const [accounts, setAccounts] = useState([]);
    const [animating, setAnimating] = useState(true);
    const theme = useTheme()
    const styles = getStyles(theme);

    useEffect(() => {
        setAnimating(false);
        fetch(`${apiUrl}/accounts`)
            .then(res => res.json())
            .then(data => {
                setAccounts(data)
                
            })
            .catch()
    }, []);


    const renderItem = ({ item }) => <AccountItem
        title={item.name}
        type={item.type}
        accountBalance={item.balance.toString()}
        image={item.image}
        accountId={item.id}
        navigation={navigation}
    />;


    if (animating) {
        return (
            <WaitingComponent animating={animating} />
        )
    }
    else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={accounts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }} />
                <AddAccountButton navigation={navigation} />
            </View>
        )

    }

}
const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
})

export default AccountList;