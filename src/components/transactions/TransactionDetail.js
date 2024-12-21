import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, List, Divider, Text, ActivityIndicator, useTheme } from 'react-native-paper';

const TransactionDetail = ({ route }) => {
  const { transactionId } = route.params;
  const apiUrl = process.env.EXPO_API_URL;
  const theme = useTheme();
  const [transaction, setTransaction] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId, apiUrl]);

  const formatDate = (date) =>{
    const formattedDate = new Date(date); 
    const day = String(formattedDate.getDate()).padStart(2, '0'); 
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); 
    const year = formattedDate.getFullYear(); 
    return `${day}-${month}-${year}`; 
}

  const fetchSubCategory = async (subcategoryId) => {
    try {
      const response = await fetch(`${apiUrl}/subcategories/${subcategoryId}`);
      const data = await response.json();
      setSubCategory(data);
    } catch (error) {
      console.error('Error fetching subcategory:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {transaction ? (
        <Card style={styles.card}>
          <Card.Title title="Transaction Details" titleStyle={styles.cardTitle} />
          <Card.Content>
            <List.Section>
              <List.Item
                title="Amount"
                description={`€ ${transaction.amount.toFixed(2)}`}
                descriptionStyle={{
                  color: transaction.amount >= 0 ? theme.colors.success : theme.colors.error,
                }}
              />
              <Divider />
              <List.Item title="Date" description={formatDate(transaction.date)} />
              <Divider />
              <List.Item title="Description" description={transaction.description || 'N/A'} />
              <Divider />
              <List.Item title="Account ID" description={transaction.accountId || 'N/A'} />
              <Divider />
              <List.Item
                title="Category"
                description={category ? category.name : 'N/A'}
              />
              <Divider />
              <List.Item
                title="Subcategory"
                description={subCategory ? subCategory.name : 'N/A'}
              />
            </List.Section>
          </Card.Content>
        </Card>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading transaction</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default TransactionDetail;
