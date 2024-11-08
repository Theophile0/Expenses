import {Text, View, StyleSheet, Dimensions, Image} from "react-native";
import theme from '../../styles/theme.js';

const itemWidth = Dimensions.get('window').width

const AccountItem = (props) => {
    const {title, type, accountNumber, accountBalance, image} = props;


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri:image}} resizeMode={'contain'} style={[styles.image]} />
                {console.log(image)}
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.titleText]}>{title}</Text>
                <Text style={[styles.text, styles.smallText]}>{type}</Text>
            </View>
            <View style={styles.balanceContainer}>
                <Text style={[PositiveBalance(accountBalance)? styles.balancePositive: styles.balanceNegative, styles.balance]}>€ {PositiveBalance(accountBalance)? accountBalance:  accountBalance}</Text>
            </View>
        </View>
    )
        
}

const PositiveBalance = (accountBalance) =>{
    return accountBalance >= 0? true: false
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

        margin: 10,
        marginTop: 10,
        width: itemWidth -50,
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.BACKGROUND_COLOR_PRIMARY,
        fontSize: theme.FONT_SIZE_LARGE,
    },
    imageContainer:{
        flex:1
    },
    image:{
        width: 50,
        height: 50,
        },
    textContainer:{
        flex:1,
        flexWrap: 'nowrap'
    },
    smallText:{
        color: theme.FONT_COLOR_PRIMARY,
        fontSize: theme.FONT_SIZE_SMALL,
        whiteSpace: 'nowrap',
    },
    titleText:{
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontWeight: '500'
    },
    balanceContainer:{
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    balance:{
        fontSize: theme.FONT_SIZE_LARGE,
    },
    balancePositive:{
        color: theme.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative:{
        color: theme.NEGATIVE_NUMBER_COLOR,
    },
})

export default AccountItem;