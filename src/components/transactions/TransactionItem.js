import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from "react-native";
import { useTheme } from "react-native-paper";
import {PositiveAmount} from '../shared/Functions.js'


const itemWidth = Dimensions.get('window').width

const TransactionItem = (props) => {
const {date, category, subcategory, amount, image,transactionId, navigation} = props;
const theme = useTheme();
const styles = getStyles(theme);




const formatDate = (date) =>{
    const formattedDate = new Date(date); 
    const day = String(formattedDate.getDate()).padStart(2, '0'); 
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); 
    const year = formattedDate.getFullYear(); 
    return `${day}-${month}-${year}`; 
}
    
    return(
        
          
<TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TransactionDetails', {transactionId: transactionId})}>
<View style={styles.imageContainer}>
  { image !== "" 
    ? <Image source={{uri: image}} resizeMode={'contain'} style={[styles.image]} /> 
    : <Image source={require('../../assets/broken-image.png')} resizeMode={'contain'} style={[styles.image]} /> 
  }
</View>       <View style={styles.textContainer}>
            <Text style={[styles.text, styles.smallText]}>{formatDate(date)}</Text>
            <Text style={[styles.text, styles.titleText]}>{category}</Text>
            <Text style={[styles.text, styles.smallText]}>{subcategory}</Text>
        </View>
        <View style={styles.balanceContainer}>
            <Text style={[PositiveAmount(amount)? styles.balancePositive: styles.balanceNegative, styles.balance]}>
                € {PositiveAmount(amount)? amount:  amount}
            </Text>
        </View>
    </TouchableOpacity>
        
    
    );
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
        fontSize: theme.fonts.FONT_SIZE_LARGE,
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
        fontSize: theme.fonts.FONT_SIZE_SMALL,
        whiteSpace: 'nowrap',
    },
    titleText:{
        color: theme.colors.onSurface,
        fontSize: theme.fonts.FONT_SIZE_MEDIUM,
        fontWeight: '500'
    },
    balanceContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    balance:{
        fontSize: theme.fonts.FONT_SIZE_LARGE,
    },
    balancePositive:{
        color: theme.colors.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative:{
        color: theme.colors.NEGATIVE_NUMBER_COLOR,
    },
})

export default TransactionItem;