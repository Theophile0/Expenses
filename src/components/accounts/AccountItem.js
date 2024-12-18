import {Text, View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import {PositiveAmount} from '../shared/Functions.js'
import { useTheme } from "react-native-paper";


const itemWidth = Dimensions.get('window').width

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const AccountItem = (props) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const {title, type, accountBalance, image, accountId, navigation} = props;
    const brokenImage = "assets\broken-image.png"
   

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Transactions',{accountId: accountId} )}>
            <View style={styles.imageContainer}>
                <Image source={image !== "" ? {url:image}: {uri:brokenImage}} resizeMode={'contain'} style={[styles.image]} />
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
const getStyles = (theme) => StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

        margin: 10,
        marginTop: 10,
        width: itemWidth -50,
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.colors.primaryContainer,
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
        color: theme.colors.onSurface,
        fontSize: theme.FONT_SIZE_SMALL,
        whiteSpace: 'nowrap',
    },
    titleText:{
        color: theme.colors.onSurface,
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
        color: theme.colors.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative:{
        color: theme.colors.NEGATIVE_NUMBER_COLOR,
    },
})


export default AccountItem;