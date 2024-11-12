import react from 'react'
import { View } from 'react-native-web'
import TransactionEditor from '../components/transactions/TransactionEditor'


const TransactionEditorScreen = (props) =>{
    const { navigation, route } = props;
    console.log(route);
    return(
        <View>
            <TransactionEditor navigation={navigation} route={route}></TransactionEditor>
        </View>
    )
}

export default TransactionEditorScreen