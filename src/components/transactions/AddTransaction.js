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
  const [posinegative, setPosinegative] = useState('positive');

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
      fetch(`${apiUrl}/subcategories/category/${category}`)
        .then(res => res.json())
        .then(data => {
          setSubcategories(data);
          setSubcategory('');
        })
        .catch(error => console.error('Error fetching subcategories:', error));
    }
  };

  const handleSubmit = () => {
    try {
      
      if (category === '') {
        setCategoryError(true);
        return;
      }
      if (subCategory === '') {
        setSubCategoryError(true);
        return;
      }
      
      if (amount === ''| amount=== '- ' || amount === '-') {
        amount = 0.0;
      }
      
      console.log(amount)
      const adjustedAmount = posinegative === 'negative' ? -parseFloat(amount) : parseFloat(amount);
      console.log(adjustedAmount)

      fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          amount: amount,
          accountId: accountId,
          subCategoryId: subCategory,
        }),
      })
        .then(response => {
          if (response.ok) {
            navigation.goBack();
          }
          console.log(response)
        })
        .catch(error => {
          setFetchError(true);
        });
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleCategoryChange = (selectedCategoryValue) => {
    setSubcategories([])
    if (selectedCategoryValue === "AddCategory") {
      navigation.navigate('AddCategory');
    } else {
      setCategory(selectedCategoryValue);
      
      refreshSubcategories();
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
    const isNumeric = /^-?\s?\d*\.?\d{0,2}$/.test(text);
  
    if (text === '' || isNumeric) {
      setAmount(text);
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };
  

  const handleRadioChange = (value) => {
    setPosinegative(value);
    if (value === "negative" && !amount.startsWith("- ")) {
      setAmount((prev) => (prev ? `- ${prev}` : "- "));
    } else if (value === "positive" && amount.startsWith("- ")) {
      setAmount((prev) => prev.substring(2));
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
          onChangeText={text => {
            handleAmountChange(text);
          }}
          left={<TextInput.Affix text="€" />}
          style={styles.input}
        />
        <View style={styles.radioGroup}>
          <RadioButton
            value="positive"
            status={posinegative === 'positive' ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange('positive')}
            color={theme.colors.primary}
          />
          <Text style={styles.radioText}>Positive</Text>
          <RadioButton
            value="negative"
            status={posinegative === 'negative' ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange('negative')}
            color={theme.colors.primary}
          />
          <Text style={styles.radioText}>Negative</Text>
        </View>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => {
            setDescription(text);
          }}
          theme={{ colors: { primary: theme.colors.text, background: theme.colors.surface } }}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={handleCategoryChange}
            style={styles.picker}
          >
            <Picker.Item label="Select a Category" value="" />
            {categories.map(cat => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
            <Picker.Item label={"+ New category"} value={"AddCategory"} />
          </Picker>
        </View>
        {category && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={subCategory}
              onValueChange={handleSubCategoryChange}
              style={styles.picker}
            >
              <Picker.Item label="Select a Subcategory" value="" />
              {subcategories?.map(sub => (
                <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
              ))}
              <Picker.Item style={styles.pickerItem} label={"New subcategory"} value={"AddSubCategory"} />
            </Picker>
          </View>
        )}

        {categoryError && <Text style={styles.errorMessage}>Select a category</Text>}
        {subCategoryError && <Text style={styles.errorMessage}>Select a subcategory</Text>}
        {amountError && <Text style={styles.errorMessage}>Amount must be a number</Text>}

        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
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
                closeModal={() => {
                  setModalVisible(false);
                  refreshSubcategories();
                }}
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
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    color: theme.colors.text,
    marginRight: 10,
  },
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
  },
  pickerContainer: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  picker: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: theme.colors.text,
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
});

export default AddTransaction;
