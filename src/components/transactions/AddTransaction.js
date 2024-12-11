import react from "react";
import { View, TextInput, Button, Text, DatePicker } from 'react-native';
import { useState,useEffect  } from "react";

const AddTransaction = () =>{
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const handleAddTransaction = () => {
      // Send data to backend API or perform other actions
      console.log('Transaction added:', { amount, date, category, description, paymentMethod });
    };
  
    return (
      <View>
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <DatePicker
          date={date}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => setDate(date)}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Payment Method"
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />
        <Button title="Add Transaction" onPress={handleAddTransaction} />
      </View>
    );
  };


export default AddTransaction;