import react from "react";
import { View,StyleSheet, TextInput, Button, Text, DatePicker } from 'react-native';
import { useState, useEffect  } from "react";
import { useTheme } from "react-native-paper";


const AddTransaction = () =>{
  const theme = useTheme();
  const styles = getStyles(theme);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const handleAddTransaction = () => {
      console.log('Transaction added:', { amount, date, category, description, paymentMethod });
    
  
    return (
      <View>
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
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
        />
        <TextInput 
            style={styles.textInput}
            mode="outlined"
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
        />
        <Button onPress={() => setOpen(true)} mode="outlined">
        Pick a Date
      </Button>
      <DatePickerModal
        locale="en" // optional, default: en-GB
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        date={date}
        // Optional props
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'fade'
        startYear={1990} // optional, default: 1900
        endYear={2050} // optional, default: current year + 5
        // validRange={{ startDate: new Date('2024-01-01'), endDate: new Date() }} // optional
        // onChange={(params) => {console.log(params)}} // optional
      />
       {date && <Text>Selected Date: {format(date, 'dd/MM/yyyy')}</Text>}
    
        
      </View>
    );
  };
}

  const getStyles =(theme) => StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: theme.SCREEN_HORIZONTAL_MARGIN,
    },
  })


export default AddTransaction;