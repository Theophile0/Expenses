import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, FAB } from "react-native-paper";



const AddEntityButton = (props) => {
    const { action, disabled } = props;
    const theme = useTheme();
    const styles = getStyles(theme)

    return (
       
        <FAB
            icon="plus"
            size='large'
            style={styles.fab}
            color={theme.colors.onSurface}
            onPress={action}
            customSize={80}
            disabled={disabled}
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



export default AddEntityButton