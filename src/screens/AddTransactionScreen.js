import React from "react";
import AddTransaction from "../components/transactions/AddTransaction";
import { View } from "react-native-web";

const AddTransactionScreen = (props) => {
    const{navigation, route} = props;
    return(
        <View>
            <AddTransaction navigation={navigation} route={route}></AddTransaction>

        </View>
    );
}

export default AddTransaction;