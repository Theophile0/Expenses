import AddCategory from '../components/categories/AddCategory';
import {View, StyleSheet} from 'react-native';


const AddCategoryScreen = (props) =>{
    const { navigation } = props;
    return(
        <View style={styles.container}>
            <AddCategory navigation={navigation}></AddCategory>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AddCategoryScreen;