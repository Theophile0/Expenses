import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from "react-native";
import { useTheme } from "react-native-paper";
import {PositiveAmount} from '../shared/Functions.js'


const itemWidth = Dimensions.get('window').width

const TransactionItem = (props) => {
    const {date, category, subcategory, amount, image,transactionId, navigation} = props;
    const theme = useTheme();
  const styles = getStyles(theme);
    
    return(
        <View>
          
<TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TransactionDetails', {transactionId: transactionId})}>
        {
            console.log("Does this work")
        }
        
        <View style={styles.imageContainer}>
            <Image source={{uri:image}} resizeMode={'contain'} style={[styles.image]} />
        </View>
        <View style={styles.textContainer}>
            <Text style={[styles.text, styles.smallText]}>{date}</Text>
            <Text style={[styles.text, styles.titleText]}>{category}</Text>
            <Text style={[styles.text, styles.smallText]}>{subcategory}</Text>
        </View>
        <View style={styles.balanceContainer}>
            <Text style={[PositiveAmount(amount)? styles.balancePositive: styles.balanceNegative, styles.balance]}>€ {PositiveAmount(amount)? amount:  amount}</Text>
        </View>
    </TouchableOpacity>
        </View>
    
    )
}



const getStyles =(theme) => StyleSheet.create({
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


export default TransactionItem;