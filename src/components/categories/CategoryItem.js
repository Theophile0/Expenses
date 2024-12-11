import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import AccountItem from "./AccountItem.js";
import {categories} from "../../../data/categories.js";
import { useTheme } from "react-native-paper";


const CategoryItem = (props) =>{
    const theme = useTheme();
    const styles = getStyles(theme);
    return(<Text>{"Helloworld"}</Text>)
    
}

const getStyles = (theme) = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: theme.SCREEN_HORIZONTAL_MARGIN,
    },
})