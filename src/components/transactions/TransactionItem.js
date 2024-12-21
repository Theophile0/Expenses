import React, {useState} from "react";
import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity, Alert} from "react-native";
import { useTheme } from "react-native-paper";
import {PositiveAmount} from '../shared/Functions.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const itemWidth = Dimensions.get('window').width

const TransactionItem = (props) => {
const {date, category, subcategory, amount, image,transactionId, navigation, onDelete, onEdit} = props;
const theme = useTheme();
const styles = getStyles(theme);
const [isLongPressed, setIsLongPressed] = useState(false); 

    const handleLongPress = () => {
        if(isLongPressed){
            setIsLongPressed(false);
        } 
        else{
            setIsLongPressed(true);
        }
    };

    const handleShortPress = () =>{
        setIsLongPressed(false);
    }

     const handleDelete = () => {
            Alert.alert(
                "Delete transaction",
                "Are you sure you want to delete this transaction?"
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", 
                        onPress: () => onDelete(transactionId) 
                    }
                ]
            );
        };

const formatDate = (date) =>{
    const formattedDate = new Date(date); 
    const day = String(formattedDate.getDate()).padStart(2, '0'); 
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); 
    const year = formattedDate.getFullYear(); 
    return `${day}-${month}-${year}`; 
}
    
    return(
        
          
<TouchableOpacity 
style={[styles.container, isLongPressed && styles.longPressed]} 
onPress={isLongPressed ? handleShortPress :() => navigation.navigate('TransactionDetails', {transactionId: transactionId})}
onLongPress={handleLongPress}
>
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
        {isLongPressed && (
                        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                            <Icon name="trash-can" size={40} color={theme.colors.error} />
                        </TouchableOpacity>
                    )}
                    {isLongPressed && (
                        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                            <Icon name="pencil" size={40}  color={theme.colors.pencil} />
                        </TouchableOpacity>
                    )}
    </TouchableOpacity>
        
    
    );
}



const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: itemWidth - 50,
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.colors.primaryContainer,
    },
    longPressed: {
        opacity: 0.5,  // This opacity applies to the container only
    },
    imageContainer: {
        flex: 0.75
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer: {
        flex: 1.25,
        flexWrap: 'nowrap',
    },
    smallText: {
        color: theme.colors.onSurface,
        fontSize: theme.fonts.FONT_SIZE_SMALL,
    },
    titleText: {
        color: theme.colors.onSurface,
        fontSize: theme.fonts.FONT_SIZE_MEDIUM,
        fontWeight: theme.fonts.FONT_WEIGHT_MEDIUM,
    },
    balanceContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    balance: {
        fontSize: theme.fonts.FONT_SIZE_LARGE,
    },
    balancePositive: {
        color: theme.colors.POSITIVE_NUMBER_COLOR,
    },
    balanceNegative: {
        color: theme.colors.NEGATIVE_NUMBER_COLOR,
    },
    deleteButton: {
        opacity:1,
        position: 'absolute',
        top: 10,
        right: itemWidth/2,
    },
    editButton: {
        opacity: 1,
        position: 'absolute',
        top: 10,
        left: itemWidth/2,
    }
});
export default TransactionItem;