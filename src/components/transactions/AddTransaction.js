import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Modal } from 'react-native';
import { TextInput, Button, useTheme, RadioButton } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import AddSubcategory from "../subcategories/AddSubcategory";

const AddTransaction = (props) => {
  const { navigation, route } = props;
  const { accountId } = route.params;
  const theme = useTheme();
  const styles = getStyles(theme);
  const apiUrl = process.env.EXPO_API_URL;

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(Date.now);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subCategory, setSubcategory] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [posinegative, setPosinegative] = useState('positive')

  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch();
  }, []);

  const refreshSubcategories = () => {
    if (category) {
      fetch(`${apiUrl}/subcategories?categoryId=${category}`)
        .then(res => res.json())
        .then(data => {
          setSubcategories(data);
          console.log(subcategories)
          setSubcategory('');  
        })
        .catch(error => console.error('Error fetching subcategories:', error));
    }
  };

  const handleSubmit = () => {
    try {
      if (category === '') {
        setCategoryError(true);
        return
      }
      if (subCategory === '') {
        setSubCategoryError(true);
        return
      }
      if (amount === '') {
        amount = 0.0
      }

      fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          amount: amount,
          accountId: accountId,
          subCategoryId: subCategory.id
        })
      })
        .then(response => { if (response.ok) { navigation.goBack(); } })
        .catch(error => {
          setFetchError(true);
        });
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleCategoryChange = (selectedCategoryValue) => {
    if (selectedCategoryValue === "AddCategory") {
      navigation.navigate('AddCategory');
    } else {
      setCategory(selectedCategoryValue);
      refreshSubcategories()
    }
  };

  const handleSubCategoryChange = (selectedSubCategoryValue) => {
    if (selectedSubCategoryValue === "AddSubCategory") {
      setModalVisible(true); 
    } else {
      setSubcategory(selectedSubCategoryValue);
    }
  };

  const handleAmountChange = (text) => {
    const isNumeric = /^-?\d+(\.\d{0,2})?$/.test(text); //e.g. 400.20 or 200
    console.log(isNumeric)
    if (isNumeric || text === '') { 
      setAmount(text);
      setAmountError(false); 
    } else {
      setAmountError(true); 
    }
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Amount"
          keyboardType="numeric"
          value={amount.toString()}
          error={amountError}
          onChangeText={
            text => {
              handleAmountChange(text)   
            }
          }
          right={<TextInput.Affix text="€" />}
        />
        <RadioButton
        value="positive"
        status={ posinegative === 'positive' ? 'checked' : 'unchecked' }
        onPress={() => setPosinegative('positive')}
      />
      <RadioButton
        value="negative"
        status={ posinegative === 'negative' ? 'checked' : 'unchecked' }
        onPress={() => setPosinegative('negative')}
      />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => {
            setDescription(text);
          }} 
          
          />

        <Picker
          selectedValue={category}
          onValueChange={handleCategoryChange}
        >
          <Picker.Item label="Select a Category" value="" />
          {categories.map(cat => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
          <Picker.Item label={"+ New category"} value={"AddCategory"} />
        </Picker>

        {/* Subcategory Picker (Visible only after selecting a category) */}
        {category && (
          <>
            <Picker
              selectedValue={subCategory}
              onValueChange={handleSubCategoryChange}
            >
              <Picker.Item label="Select a Subcategory" value="" />
              {subcategories?.map(sub => (
                <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
              ))}
              <Picker.Item label={"New subcategory"} value={"AddSubCategory"} />
            </Picker>
          </>
        )}

        { categoryError ? <Text style={styles.errormessage}>Select a category</Text> : <></>}
        { subCategoryError ? <Text style={styles.errormessage}>Select a subcategory</Text> : <></>}
        { amountError ? <Text style={styles.errormessage}>Amount must be a number</Text>:<></>}


        <Button style={styles.button} mode='contained' onPress={handleSubmit}>
          Add Transaction
        </Button>

       
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <AddSubcategory
                categoryId={category} 
                closeModal={() =>{
                  setModalVisible(false)
                  refreshSubcategories()
                } } 
                
              />
            </View>
          </View>
        </Modal>

      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  errormessage:{
    color: theme.colors.error
  }
});

export default AddTransaction;
