import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useTheme, TextInput, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';


const itemWidth = Dimensions.get('window').width;

const AddCategory = (props) => {
  const { navigation } = props;
  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#102945');
  const [redValue, setRedValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
 
    
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
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
    if (!name) {
      setNameError(true);
      return;
    }
    if(!description){
      setDescription("")
    }

    const formData = new FormData();
    formData.append('json',JSON.stringify({
      name: name,
      description: description,
      color: color
    }))

 
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

    }

    fetch(`${apiUrl}/categories`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          setFetchError(true)
          return
        }
        navigation.goBack()
      })
      .catch(error => {
        setFetchError(true)
      });
  };

  const handleColorChange = () => {
    const red = `${Math.floor(redValue * 255).toString(16).padStart(2, '0')}`
    const green = `${Math.floor(greenValue * 255).toString(16).padStart(2, '0')}`
    const blue = `${Math.floor(blueValue * 255).toString(16).padStart(2, '0')}`
    const hexValue = `#${red}${green}${blue}`;
    setColor(hexValue)
  }
  const handleRedValueChange= (value) =>{
    setRedValue(value);
    handleColorChange();
  }
  const handleGreenValueChange= (value) =>{
    setGreenValue(value);
    handleColorChange();

  }
  const handleBlueValueChange= (value) =>{
    setBlueValue(value);
    handleColorChange();
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          error={nameError}
          mode="outlined"
          label="Category Name*"
          value={name}
          onChangeText={text => {
            setName(text);
            setNameError(false);
          }}
        />

        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        
        <Slider
        style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            onValueChange={handleRedValueChange}
            minimumTrackTintColor={theme.colors.primary} // MD3 primary color
            maximumTrackTintColor={theme.colors.onSurfaceVariant} // MD3 onSurfaceVariant color
            thumbTintColor={theme.colors.secondary}
           

        />
        <Slider
        style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={theme.colors.primary} 
          maximumTrackTintColor={theme.colors.onSurfaceVariant} 
          thumbTintColor={theme.colors.secondary} 
          onValueChange={handleGreenValueChange}
       

        />
        <Slider
        style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            onValueChange={handleBlueValueChange}
            minimumTrackTintColor={theme.colors.primary} 
            maximumTrackTintColor={theme.colors.onSurfaceVariant} 
        />

<View style={[styles.colorPreview, { backgroundColor: color }]} />
        
<TouchableOpacity onPress={handleImagePicker}>
          <View style={styles.imagePreviewContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePreviewPlaceholder}>Select an image</Text>
            )}
          </View>
        </TouchableOpacity>

        {image && (
  <Button
    style={[styles.button, { backgroundColor: theme.colors.error }]} 
    labelStyle={{ color: theme.colors.onError }} 
    onPress={handleRemoveImage}
  >
    Delete Image
  </Button>
)}
{
    nameError ? (   <View style={styles.errorList}>
    <Text>Category name can't be empty</Text>
        </View>)
        : (<></>)
}
            
<Button
  style={styles.button} 
  onPress={handleSubmit}
>
  Add Category
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
  textInput: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  imagePreviewContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    width: itemWidth - 50,
    
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    paddingBottom: 20,
  },
  imagePreview:{
    alignSelf: 'center',
    borderRadius: 10,
    width: itemWidth - 50,
    height: itemWidth,
    resizeMode: 'contain',
    marginTop: 20,
  },
  imagePreviewPlaceholder:{
    color: theme.colors.primary,  
    fontSize: 16, 
    textAlign: 'center',
    
  },
  slider:{
    height: itemWidth/6,
    width: itemWidth - 50
  },
  colorPreview: {
    width: itemWidth - 50,
    height: itemWidth / 4,
    borderRadius: 10,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,  
    justifyContent: 'center',  
  }
});

export default AddCategory;
