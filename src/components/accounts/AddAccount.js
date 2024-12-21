import React from "react";
import { View, Text, StyleSheet, Image, Dimensions,ScrollView, Platform } from 'react-native'
import { useState, useEffect, } from "react";
import { useTheme, TextInput, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const itemWidth = Dimensions.get('window').width

const AddAccount = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL;
  const [titleError, setTitleEror] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [fetchError, setFetchError] = useState(false);


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
    setImage(null)
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
      const json = JSON.stringify({
        type: type, 
        name: title,
      })
      formData.append('json', json);

      if(image === null){
        setImage( require('../../assets/broken-image.png'))
      }
     

      if (image) {
        const uri = image;
        const fileType = uri.split('.').pop();
        const imageName = `title_${Date.now()}.${fileType}`

        formData.append('imageName', imageName)
        formData.append('image', {
          uri: uri,
          type: `image/${fileType}`,
          name: imageName,
        });
          
        fetch(`${apiUrl}/accounts`, {
          method: 'POST',
          body: formData,
        })
        .then(response => {
          if(!response.ok){
            setFetchError(true)
            return
          }
        })
          .then(data => {
            navigation.goBack();
          })
          .catch((error) => {
            setFetchError(true)
          });
      } else{
        
      }
      
      
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

      

        <Button
          style={styles.button}
          mode="outlined"
          onPress={image ? handleRemoveImage : handleImagePicker}
        >
          {image ? "Delete Image" : "Choose Image"}
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
    margin: Platform.OS === 'web'? 'auto' : 0
  },
  textInput: {
    marginTop: 20
  },
  button: {
    marginTop: 20
  },
  imagePreview: {
    alignSelf: 'center',
    width: itemWidth - 50, 
    height: itemWidth, 
    resizeMode: 'contain',
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    
  },
});


export default AddAccount;