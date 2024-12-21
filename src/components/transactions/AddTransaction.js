import react from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useState, useEffect } from "react";
import { useTheme, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";


const AddTransaction = (props) => {
  const { navigation } = props
  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amountEror, setAmountError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subCategory, setSubcategory] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
      .catch()
  }, []);

  useEffect(() => {
    if (category) {
      
      fetch(`${apiUrl}/subcategories`)
        .then(res => res.json())
        .then(data => {
          setSubcategories(data);
          setSubcategory(''); 
        })
        .catch(error => console.error('Error fetching subcategories:', error));
    }
  }, [category]); 

  const handleCategoryChange = (selectedCategoryValue) => {
    if(selectedCategoryValue === "AddCategory"){
      navigation.navigate('AddCategory')
    } else{
      setCategory(selectedCategoryValue);
    }
  };

  const handleSubCategoryChange = (selectedSubCategoryValue) => {
    if(selectedSubCategoryValue === "AddSubCategory"){
      navigation.navigate('AddSubCategory')
    } else{
        setSubcategory(selectedSubCategoryValue)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Amount"
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={
            text => {
              setAmount(text)
              setAmountError(false)
            }
          }
          right={<TextInput.Affix text="€" />}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => {
            setDescription(text)
          }} />


        <Picker
          selectedValue={category}
          onValueChange={handleCategoryChange}
        >
          <Picker.Item label="Select a Category" value="" />
          {categories.map(cat => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
          <Picker.Item label={ "+ New category"} value={"AddCategory"} ></Picker.Item>
        </Picker>

        {/* Subcategory Picker (Visible only after selecting a category) */}
        {category && (
          <>
            <Picker
              selectedValue={subCategory}
              onValueChange={handleSubCategoryChange}
            >
              <Picker.Item label="Select a Subcategory" value="" />
              {subcategories[category]?.map(sub => (
                <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
              ))}
              <Picker.Item label={ "New subcategory"} value={"AddSubCategory"} ></Picker.Item>
            </Picker>
          </>
        )}
      </View>
    </ScrollView>

  );
};


const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
})


export default AddTransaction;