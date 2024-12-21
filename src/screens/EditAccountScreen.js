import React from "react";
import AccountEdit from "../components/accounts/AccountEdit";
import { View, StyleSheet } from "react-native";

const AccountEditScreen = (props) => {
    const{navigation, route} = props;
    return(
        <View style={styles.container}>
            <AccountEdit navigation={navigation} route={route}></AccountEdit>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AccountEditScreen;