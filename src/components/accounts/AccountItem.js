import {Text, View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import theme from '../../styles/theme.js';
import {PositiveAmount} from '../shared/Functions.js'

const itemWidth = Dimensions.get('window').width

const AccountItem = (props) => {
    const {title, type, accountBalance, image,accountId, navigation} = props;
   console.log(accountId);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Transactions',{accountId: accountId} )}>
            <View style={styles.imageContainer}>
                <Image source={{uri:image}} resizeMode={'contain'} style={[styles.image]} />
                {console.log(image)}
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.titleText]}>{title}</Text>
                <Text style={[styles.text, styles.smallText]}>{type}</Text>
            </View>
            <View style={styles.balanceContainer}>
                <Text style={[PositiveAmount(accountBalance)? styles.balancePositive: styles.balanceNegative, styles.balance]}>€ {accountBalance}</Text>
            </View>
        </TouchableOpacity>
    )
        
}

export const styles = StyleSheet.create({
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
        flex:0.75
    },
    image:{
        width: 50,
        height: 50,
    },
    textContainer:{
        flex:1.25,
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
        flex: 1,
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