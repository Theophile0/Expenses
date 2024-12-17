import React from "react";
import {View, Text, StyleSheet,  Image} from 'react-native'
import { useState, useEffect , } from "react";
import { useTheme,TextInput, Button} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const AddAccount = (props) => {
    const {navigation } = props;
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [accountBalance, setAccountBalance] = useState(0.0);
    const [image, setImage] = useState(null);
    const theme = useTheme();
    const styles = getStyles(theme);
    const apiUrl = process.env.EXPO_API_URL

  
    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
          });
        console.log(result.assets[0].uri)
      if (!result.canceled && resourceLimits.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    };

    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        })();
    }, []);

   
    const handleSubmit = async () => {
        const accountData = {
            title: title,
            type: type,
            image: "teststring", 
        };
    
        try {
            const response = await axios.post(`${apiUrl}/accounts`, accountData);
            console.log('Data sent successfully:', response.data);
            // Handle success, e.g., navigate to another screen
            navigation.goBack();
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle error, e.g., show an error message to the user
        }
    };
    
  
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textInput}
            mode="outlined"
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
        />

        <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Type"
            value={type}
            onChangeText={text => setType(text)}
        />

        {/* <TextInput
            mode="outlined"
            label="Balance"
            keyboardType="numeric"
            value={accountBalance.toString()}
            onChangeText={setAccountBalance}
            right={<TextInput.Affix text="€" />}
        /> */}

        <Button style={styles.button} mode='outlined' onPress={handleImagePicker}>
            Choose Image
        </Button>
        {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : <Text>Kies een image</Text>}
        

        
        <Button style={styles.button} mode='contained' onPress={handleSubmit}>
            Add Account
             </Button> 
      </View>
    );
  };
  
  const getStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    textInput:{
        marginTop: 20
    },
    button:{
        marginTop: 20
    }
  });
  

export default AddAccount;