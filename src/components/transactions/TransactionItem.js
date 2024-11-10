import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from "react-native";
import theme from '../../styles/theme.js';
import {PositiveAmount} from '../shared/Functions.js'
import {styles} from '../accounts/AccountItem.js'


const itemWidth = Dimensions.get('window').width

const TransactionItem = (props) => {
    const {date, category, subcategory, amount, image,transactionId, navigation} = props;
    
    return(
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TransactionDetails', {transactionId: transactionId})}>
        <View style={styles.imageContainer}>
            <Image source={{uri:image}} resizeMode={'contain'} style={[styles.image]} />
            {console.log(image)}
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
    )
}



export default TransactionItem;