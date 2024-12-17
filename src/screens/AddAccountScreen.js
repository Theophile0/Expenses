import AddAccount from '../components/accounts/AddAccount';
import {View, StyleSheet} from 'react-native';


const AccountsScreen = (props) =>{
    const { navigation } = props;
    return(
        <View style={styles.container}>
            
            <AddAccount navigation={navigation}></AddAccount>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AccountsScreen;