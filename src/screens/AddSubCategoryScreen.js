import AddSubcategory from '../components/subcategories/AddSubcategory';
import {View, StyleSheet} from 'react-native';


const AddSubCategoryScreen = (props) =>{
    const { navigation } = props;

    console.log('screen')
    return(
        <View style={styles.container}>
            <AddSubcategory navigation={navigation}></AddSubcategory>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

export default AddSubCategoryScreen;