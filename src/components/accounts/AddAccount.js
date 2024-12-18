import React from "react";
import { View, Text, StyleSheet, Image, Dimensions,ScrollView } from 'react-native'
import { useState, useEffect, } from "react";
import { useTheme, TextInput, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const itemWidth = Dimensions.get('window').width

const AddAccount = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [accountBalance, setAccountBalance] = useState(0.0);
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL;
  const [titleError, setTitleEror] = useState(false);
  const [typeError, setTypeError] = useState(false);


  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
    console.log(result.assets[0].uri)
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  const handleRemoveImage = () => {
    setIcon(null)
  }
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);


  const handleSubmit = async () => {
    try {
      if (title === "") {
        setTitleEror(true)
        return;
      } else if (type === "") {
        setTypeError(true)
        return;
      }
      const formData = new FormData();
      formData.append('type', type);
      formData.append('name', title);
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileType = blob.type

        if (!fileType.startsWith('image/')) {
          alert('Please select a valid image file.'); 
          return; 
        }
        

        formData.append('image', blob, blob.name )
      }
      console.log("image in submit " + image)
      fetch(`${apiUrl}/accounts`, {
        method: 'POST',
        body: formData,
        
      }).then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        formData = new FormData()
        navigation.navigate('Accounts')
        
        return response;
      })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Eror:', error);
    }

  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          error={titleError}
          mode="outlined"
          label="Title"
          value={title}
          onChangeText={text => {
            setTitle(text)
            setTitleEror(false)
          }}
        />

        <TextInput
          style={styles.textInput}
          error={typeError}
          mode="outlined"
          label="Type"
          value={type}
          onChangeText={text => {
            setType(text)
            setTypeError(false)
          }}
        />

        {/* <TextInput
            mode="outlined"
            label="Balance"
            keyboardType="numeric"
            value={accountBalance.toString()}
            onChangeText={setAccountBalance}
            right={<TextInput.Affix text="€" />}
        /> */}

        <Button
          style={styles.button}
          mode="outlined"
          onPress={icon ? handleRemoveImage : handleImagePicker}
        >
          {icon ? "Delete Image" : "Choose Image"}
        </Button>
        {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : <Text>Select an image</Text>}



        <Button style={styles.button} mode='contained' onPress={handleSubmit}>
          Add Account
        </Button>
      </View>
    </ScrollView>
  );
};

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    marginTop: 20
  },
  button: {
    marginTop: 20
  },
  imagePreview: {
    alignSelf: 'center',
    width: itemWidth - 50, // Pas de breedte aan naar wens
    height: itemWidth, // Pas de hoogte aan naar wens
    resizeMode: 'contain', // Behoudt de aspect ratio van het beeld
    borderRadius: 10, // Voegt afgeronde hoeken toe
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
  },
});


export default AddAccount;