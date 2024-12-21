import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Platform, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const itemWidth = Dimensions.get('window').width


const AccountEdit = (props) => {
    const { params } = useRoute();
    const navigation = useNavigation();
    const apiUrl = process.env.EXPO_API_URL;
    const { accountId } = params;
    const theme = useTheme();
    const styles = getStyles(theme);
    const [image, setImage] = useState('');
    const [account, setAccount] = useState(null)
    const [titleError, setTitleEror] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [animating, setAnimating] = useState(true)


    useEffect(() => {
        fetch(`${apiUrl}/accounts/${accountId}`)
            .then((response) => response.json())
            .then((data) => {
                initAccount(data)
                setAnimating(false)
            })
            .catch((error) => {
                setFetchError(true)
            });
    }, []);

    const initAccount = (account) => {
        setAccount(account)
        setImage(account.image)
    }


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

    const handleSave = async () => {
        try {
            setAnimating(true)
            if (account.title === "") {
                setTitleEror(true)
                setAnimating(false)
                return;
            } else if (account.type === "") {
                setTypeError(true)
                setAnimating(false)

                return;
            }
            const formData = new FormData();
            const json = JSON.stringify({
                type: account.type,
                name: account.title,
            })
            formData.append('json', json);



            if (image !== account.image || image === '' || image === null) {
                
                    const uri = image;
                    const fileType = uri.split('.').pop();
                    const imageName = `title_${Date.now()}.${fileType}`

                    formData.append('imageName', imageName)
                    formData.append('image', {
                        uri: uri,
                        type: `image/${fileType}`,
                        name: imageName,
                    });

                fetch(`${apiUrl}/accounts/${accountId}`, {
                    method: 'PUT',
                    body: formData,
                })
                    .then(response => {
                        if (!response.ok) {
                            console.log(response)
                            console.log("response")
                            setFetchError(true)
                            return
                        }
                    })
                    .then(data => {
                        navigation.goBack();
                    })
                    .catch((error) => {
                        setFetchError(true)
                        setAnimating(false)

                    });
            } else {

            }


        } catch (error) {
            console.error('Eror:', error);
        }

    };

    if (fetchError) {
        return (
            <FetchErrorScreen reload={""}></FetchErrorScreen>
        )
    } else if (animating) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
            </View>
        )
    }else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        error={titleError}
                        mode="outlined"
                        label="Title"
                        value={account.title}
                        onChangeText={text => setAccount({ ...account, title: text })}

                    />

                    <TextInput
                        style={styles.textInput}
                        error={typeError}
                        mode="outlined"
                        label="Type"
                        value={account.type}
                        onChangeText={text => setAccount({ ...account, type: text })}

                    />
                    <Button
                        style={styles.button}
                        mode="outlined"
                        onPress={image ? handleRemoveImage : handleImagePicker}
                    >
                        {image ? "Delete Image" : "Choose Image"}
                    </Button>
                    {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : <Text>Select an image</Text>}



                    <Button title="Save Changes" style={styles.button} mode='contained' onPress={handleSave}>
                        Add Account
                    </Button>
                    {animating ?                 <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
                    :<></>
                    }
                </View>

            </ScrollView>

        );
    }
};

const getStyles = (theme) => StyleSheet.create({
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

export default AccountEdit;
