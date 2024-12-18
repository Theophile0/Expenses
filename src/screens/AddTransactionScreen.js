import React from "react";
import AddTransaction from "../components/transactions/AddTransaction";
import { View, StyleSheet } from "react-native-web";

const AddTransactionScreen = (props) => {
    const{navigation, route} = props;
    return(
        <View style={styles.container}>
            <AddTransaction navigation={navigation} route={route}></AddTransaction>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AddTransaction;