import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, FAB } from "react-native-paper";
import { MaterialCommunityIcons } from 'react-native-vector-icons';



const AddAccountButton = (props) => {
    const {navigation} = props;
    const theme = useTheme();
    const styles = getStyles(theme)
  
    return (
        <FAB
        icon="plus"
        size='large'
        style={styles.fab}
        color={theme.colors.primary}
        onPress={() => navigation.navigate('AddAccount' )}
        />
    );
};

const getStyles = (theme) =>StyleSheet.create({
    fab:{
        
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
         
    }
});



  export default AddAccountButton;