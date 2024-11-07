import {Text, View, StyleSheet, Dimensions} from "react-native";
import theme from '../../styles/theme.js';

const itemWidth = Dimensions.get('window').width

const AccountItem = (props) => {
    const {title, type, accountNumber, accountBalance, image} = props;


    return (
        <View style={styles.container}>
            <View>
                <View>{image}</View>
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{type}</Text>
                <Text>{accountNumber}</Text>
            </View>
            <View>
                <Text style={PositiveBalance(accountBalance)? styles.balancePositive: styles.balanceNegative}>€ {PositiveBalance(accountBalance)? accountBalance:  accountBalance}</Text>
            </View>
        </View>
    )
        
}

const PositiveBalance = (accountBalance) =>{
    console.log("total:"+ accountBalance)
    return accountBalance >= 0? true: false
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10,
        marginTop: 10,
        width: itemWidth -20,
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.BACKGROUND_COLOR_PRIMARY,
        fontSty: theme.FONT_COLOR_PRIMARY,
    },
    image:{

    },
    text:{
        color: theme.FONT_COLOR_PRIMARY
    },
    balance:{
        
    },

    balancePositive:{
        color: theme.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative:{
        color: theme.NEGATIVE_NUMBER_COLOR,
    },
})

export default AccountItem;