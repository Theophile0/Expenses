import react from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, Text} from 'react-native'
import { useTheme } from 'react-native-paper'

const itemWidth = Dimensions.get('window').width

const AddTransactionButton = (props) =>{
    const {navigation, route, accountId} = props;
    const theme = useTheme();
  const styles = getStyles(theme);
    
    
    return(
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AddTransaction', {accountId: accountId})}>
            <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
    )
}

const getStyles =(theme) => StyleSheet.create({
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