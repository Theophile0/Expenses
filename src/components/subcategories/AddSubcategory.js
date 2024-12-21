import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import {  TextInput, Button, useTheme } from 'react-native-paper'

const AddSubcategory = (props) => {
    const { navigation, categoryId } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null)
    const theme = useTheme()
    const styles = getStyles(theme)
    const apiUrl = process.env.EXPO_API_URL
    useEffect(() => {
        fetch(`${apiUrl}/categories/${categoryId}`)
          .then(res => res.json())
          .then(data => {
            setCategory(data)
          })
          .catch()
      }, []);

      const handleSubmit = async () => {
        try {
          const response = await fetch(`${apiUrl}/subcategories`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              description: description,
              categoryId: categoryId,
            }),
          });
    
          if (response.ok) {
            // Handle successful creation (e.g., show success message, navigate back)
            navigation.goBack(); 
          } else {
            // Handle error (e.g., show error message)
            console.error('Error creating subcategory:', response.status);
          }
        } catch (error) {
          console.error('Error creating subcategory:', error);
        }
      };

    return(
        <ScrollView>
            <View>
                
                <TextInput
                          style={styles.textInput}
                          error={nameError}
                          mode="outlined"
                          label="Title"
                          value={title}
                          onChangeText={text => {
                            setTitle(text)
                            setTitleEror(false)
                          }}/>
            </View>
        </ScrollView>
    )

};

const getStyles = (theme) => StyleSheet.create({
    container: {

    },
})


export default AddSubcategory

