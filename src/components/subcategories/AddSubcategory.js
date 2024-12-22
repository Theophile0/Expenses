import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { TextInput, Button, useTheme } from 'react-native-paper'

const AddSubcategory = ({ categoryId, closeModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);

  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL;

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
        closeModal(); 
      } else {
        console.log(response)
      }
    } catch (error) {
      
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          error={nameError}
          mode="outlined"
          label="Name*"
          value={name}
          onChangeText={text => {
            setName(text);
            setNameError(false);
          }} />

        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => {
            setDescription(text);
          }} />

        <Button style={styles.button} mode='contained' onPress={handleSubmit}>
          Add Subcategory
        </Button>
        
        <Button style={styles.button} mode='outlined' onPress={closeModal}>
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default AddSubcategory;
