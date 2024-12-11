import react from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, Text} from 'react-native'
import theme from '../../styles/theme.js';

const itemWidth = Dimensions.get('window').width


const AddTransactionButton = (props) =>{
    const {navigation, route, accountId} = props;
    return(
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AddTransaction', {accountId: accountId})}>
            <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    icon:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.FONT_COLOR_TERTIARY,
        fontSize: theme.FONT_SIZE_EXTRA_LARGE,
        color: theme.FONT_COLOR_SECONDARY,
        width: 70,
        height: 70,
        borderRadius: 300,
       
    },
    iconText:{
        fontSize: 40, 
        color: theme.FONT_COLOR_SECONDARY,
        fontWeight: 800,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AddTransactionButton