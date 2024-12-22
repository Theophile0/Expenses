import React from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import TransactionItem from "./TransactionItem.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Button } from "react-native-paper";
import { RefreshControl } from "react-native";
import AddEntityButton from "../shared/AddEntityButton.js";
import { DatePickerModal } from "react-native-paper-dates";

const TransactionList = (props) => {
    const { navigation, route } = props;
    const { accountId } = route.params;
    const apiUrl = process.env.EXPO_API_URL
    const [animating, setAnimating] = useState(true)
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [filteredTransactions, setfilteredTransactions] = useState([])

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [fetchError, setFetchError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const theme = useTheme();
    const styles = getStyles(theme);


    //API calls
    const fetchTransactions = () => {
        fetch(`${apiUrl}/transactions/accounts/${accountId}`)
            .then(res => res.json())
            .then(data => {
                setTransactions(data)
                setfilteredTransactions(data)
                setAnimating(false)
                setRefreshing(false)
                setFetchError(false);
                setDisabled(false)
            })
            .catch(error => {
                setFetchError(true);
                setAnimating(false);
                setRefreshing(false)
            }
            )
    }

    const fetchCategories = () => {
        fetch(`${apiUrl}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
            .catch()
    }

    const fetchSubCategories = () => {
        fetch(`${apiUrl}/subcategories`)
            .then(res => res.json())
            .then(data => {
                setSubCategories(data)
            })
            .catch()
    }

    const deleteTransaction = (transactionId) => {
        console.log("got here")
        fetch(`${apiUrl}/transacions/${transactionId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setTransactions(oldTransactions => oldTransactions.filter(transaction => transaction.id !== transactionId))
                    setfilteredTransactions(oldFilteredTransactions => oldFilteredTransactions.filter(transaction => transaction.id !== transactionId))
                } else {
                    alert('Transactions could not be deleted')
                }
            })
            .catch(error => {

            })
    }

    //Refresh page logic
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTransactions([]);
        setAnimating(true);
        setDisabled(true)
        setTimeout(() => {
            fetchTransactions();
            fetchCategories();
            fetchSubCategories();
            setRefreshing(false);
        }, 300);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchTransactions();
            fetchCategories();
            fetchSubCategories();
        }, [])
    );


    //getters
    const getCategory = (categoryId) => {
        return categories.find(category => category.id === categoryId);
    }

    const getSubCategory = (subCategoryId) => {
        return subcategories.find(subcategory => subcategory.id === subCategoryId)
    }

    //UI logic
    const onDismiss = React.useCallback(() => {
        setDatePickerOpen(false);
    }, [setDatePickerOpen]);


    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setDatePickerOpen(false);
            setRange({ startDate, endDate });
            filterTransactions();
        },
        [setDatePickerOpen, setRange]
    );

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const filterTransactions = () => {
        if (!range.startDate || !range.endDate) {
            setfilteredTransactions(transactions);
            return;
        }

        const startDate = new Date(range.startDate);
        const endDate = new Date(range.endDate);

        if (isDateInFuture(startDate, endDate)) {
            alert("The end date cannot be in the future. It has been reset to toda's date.")
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("Start date cannot be later than the end date. Swapping the dates.");
            const temp = startDate;
            startDate = endDate;
            endDate = temp;
        }

        const filtered = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        setfilteredTransactions(filtered);
    };

    const isDateInFuture = (date) => {
        const currentDate = new Date();
        return new Date(date) > currentDate;
    };

    const renderItem = ({ item }) => {
        const subCategory = getSubCategory(item.subCategoryId);
        const category = subCategory ? getCategory(subCategory.categoryId) : null;
        return (
            <TransactionItem
                date={item.date}
                category={category ? category.name : "Uncategorized"}
                subcategory={subCategory ? subCategory.name : "Uncategorized"}
                amount={item.amount}
                image={category?.icon ? category.icon : ""}
                transactionId={item.id}
                navigation={navigation}
                onDelete={() => deleteTransaction(item.id)}
                onEdit={() => navigation.navigate('TransactionEdit', { transaction: item.id })}
            />
        );
    };


    if (animating) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size={'large'} animating={animating} color={theme.colors.onBackground} />
                <AddEntityButton disabled={disabled} navigation={navigation} route={route} accountId={accountId} action={() => navigation.navigate('AddTransaction')} />

            </View>
        )
    } else {
        return (

            <View style={styles.container}>
                <View style={styles.dateInputContainer}>

                    <SafeAreaProvider>
                        <Button
                            icon="calendar"
                            style={[styles.button, styles.dateButton]}
                            contentStyle={styles.dateButtonContent}
                            labelStyle={styles.dateButtonLabel}
                            onPress={() => setDatePickerOpen(true)}
                            uppercase={false}
                            mode="outlined"
                        >
                            <Text>
                                {range.startDate !== undefined && range.endDate !== undefined
                                    ? `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`
                                    : "Pick a date Range"}
                            </Text>
                        </Button>


                        {
                            range.startDate !== undefined && range.endDate !== undefined
                                ? <Button
                                    style={[styles.button, styles.clearButton, { backgroundColor: theme.colors.error }]}
                                    labelStyle={{ color: theme.colors.onError }}
                                    onPress={() => {
                                        setRange({ startDate: undefined, endDate: undefined });
                                        setfilteredTransactions(transactions);
                                    }}
                                >
                                    <Text>Clear filter</Text>
                                </Button>
                                : <></>
                        }


                        <DatePickerModal
                            disableStatusBarPadding
                            locale="be-en"
                            mode="range"
                            visible={datePickerOpen}
                            onDismiss={onDismiss}
                            startDate={range.startDate}
                            endDate={range.endDate}
                            onConfirm={onConfirm}
                            startYear={2023}
                            endYear={2024}
                            style={styles.datePickerModal}
                        />
                    </SafeAreaProvider>
                </View>

                <FlatList
                    data={filteredTransactions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

                />
                <AddEntityButton disabled={disabled} action={() => navigation.navigate('AddTransaction', { accountId: accountId })} />
            </View>

        )
    }

}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        margin: 18,
        width: '100%',
    },
    datePickerModal: {
        backgroundColor: theme.colors.surface,
        borderRadius: 12,

        padding: 16,
        shadowColor: theme.colors.onSurface,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginHorizontal: theme.margins.screenHorizontal,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
    dateButton: {
        borderColor: theme.colors.primary,
    },
    dateButtonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },

})


export default TransactionList;