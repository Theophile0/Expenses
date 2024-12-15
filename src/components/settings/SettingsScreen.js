import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PreferencesContext } from '../../../App';
import {useContext} from 'react'
import { Switch } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SettingsScreen = (props) =>{
    const {toggleTheme, isThemeDark} = useContext(PreferencesContext)
    const theme = useTheme()
    const styles = getStyles(theme)
    return(
        
            <View style={[styles.container]}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {isThemeDark? 'Dark Mode': 'Light Mode'}
                    </Text>
                    <Icon name={isThemeDark ? 'weather-night':'white-balance-sunny'} size={30}/>
                    <Switch
                        value={isThemeDark}
                        onValueChange={toggleTheme}
                        color={theme.colors.primary}
                    />

                    
                </View>
            </View>
       
    )
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: theme.colors.background
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: theme.colors.primaryContainer
        ,
        elevation: 3, // For a subtle shadow effect
      },
      text: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.onSurface,
      },

    })
   


export default SettingsScreen