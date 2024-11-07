import {Text, View, StyleSheet} from "react-native";
import theme from './src/styles/theme.js'

const Toolbar = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello world</Text>
            </View>
    )
        
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.darkTheme.BACKGROUND_COLOR_PRIMARY,
    }
})

export default Toolbar;