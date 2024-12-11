import TransactionDetail from '../components/transactions/TransactionDetail';
import {View} from "react-native";
const TransactionDetailScreen = (props) =>{
    const { navigation, route } = props;
    return(
        <View>
            <TransactionDetail navigation={navigation} route={route}></TransactionDetail>
        </View>
    )
}

export default TransactionDetailScreen;