import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { List, Card, Divider, useTheme } from 'react-native-paper';

const TransactionDetail = (props) => {
  const { navigation, route } = props;
  const { transactionId } = route.params;
  const theme = useTheme();
  const apiUrl = process.env.EXPO_API_URL;
  const [transaction, setTransaction] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/transactions/${transactionId}`);
        const data = await response.json();
        setTransaction(data);

        if (data.subcategoryId) { 
          fetchSubCategory(data.subcategoryId);
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    fetchData();
  }, [transactionId, apiUrl]);

  useEffect(() => {
    if (transaction && transaction.subcategoryId) {
      fetchSubCategory(transaction.subcategoryId);
    }
  }, [transaction]);

  const fetchSubCategory = async (subcategoryId) => {
    try {
      const response = await fetch(`${apiUrl}/subcategories/${subcategoryId}`);
      const data = await response.json();
      setSubCategory(data);
    } catch (error) {
      console.error('Error fetching subcategory:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {transaction ? (
        <Card>
          <Card.Title title="Transaction Details" />
          <Card.Content>
            <List.Section>
              <List.Item 
                title="Amount" 
                right={() => (
                  <Text 
                    style={{ 
                      color: transaction.amount >= 0 ? 'green' : 'red' 
                    }}
                  >
                    € {transaction.amount.toFixed(2)}
                  </Text>
                )} 
              />
              <Divider />
              <List.Item title="Date" right={() => <Text>{transaction.date}</Text>} />
              <Divider />
              <List.Item title="Description" right={() => <Text>{transaction.description}</Text>} />
              <Divider />
              <List.Item title="Account ID" right={() => <Text>{transaction.accountId}</Text>} />
              <Divider />
              <List.Item 
                title="Category" 
                right={() => 
                  category ? <Text>{category.name}</Text> : <Text>N/A</Text> 
                } 
              />
              <Divider />
              <List.Item 
                title="Subcategory" 
                right={() => 
                  subCategory ? <Text>{subCategory.name}</Text> : <Text>N/A</Text> 
                } 
              />
            </List.Section>
          </Card.Content>
        </Card>
      ) : (
        <View>
          <Text>Error loading transaction</Text>
        </View>
      )}
    </View>
  );
};

export default TransactionDetail;