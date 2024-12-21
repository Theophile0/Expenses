import React from "react";
import TransacionEdit from "../components/transacions/TransactionEdit";
import { View, StyleSheet } from "react-native";

const TransactionEditScreen = (props) => {
    const{navigation, route} = props;
    return(
        <View style={styles.container}>
            <TransacionEdit navigation={navigation} route={route}></TransacionEdit>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default TransactionEditScreen;