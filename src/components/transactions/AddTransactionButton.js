import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, FAB } from "react-native-paper";



const AddTransactionButton = (props) => {
    const { navigation, route, accountId } = props;
    const theme = useTheme();
    const styles = getStyles(theme)

    return (
       
        <FAB
            icon="plus"
            size='large'
            style={styles.fab}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('AddTransaction')}
        />
        
       
        
    );
};

const getStyles = (theme) => StyleSheet.create({
    fab: {

        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,

    }
});



export default AddTransactionButton