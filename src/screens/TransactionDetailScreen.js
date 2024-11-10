import TransactionDetail from '../components/transactions/TransactionDetail';
import {View} from "react-native";
const TransactionDetailScreen = (props) =>{
    const { navigation, route } = props;
    console.log(route);
    return(
        <View>
            <TransactionDetail navigation={navigation} route={route}></TransactionDetail>
        </View>
    )
}

export default TransactionDetailScreen;