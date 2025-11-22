import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const AddItems = () => {
    const [itemName, setItemName] = useState('');
    const [batchNo, setBatchNo] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');

    const handleAddItem = () => {
        // Validate if all fields are filled
        if (itemName && batchNo && expiryDate && quantity && barcode && price) {
            const priceValue = parseFloat(price);
            
            // Validate if price is a valid number
            if (isNaN(priceValue)) {
                Alert.alert('Error', 'Please enter a valid price.');
                return;
            }

            // Make a POST request to add the medicine
            axios.post('http://192.168.0.18:3000/add-medicine', {
                name: itemName,
                batch_no: batchNo,
                expiry_date: expiryDate,
                quantity: quantity,
                barcode: barcode,
                price: priceValue  
            })
            .then((response) => {
                // Success, show success message and clear the form
                Alert.alert('Success', 'Item added successfully!');
                // Clear form fields
                setItemName('');
                setBatchNo('');
                setExpiryDate('');
                setQuantity('');
                setBarcode('');
                setPrice('');
            })
            .catch((error) => {
                // If error occurs, show error message
                Alert.alert('Error', 'Failed to add item.');
                console.error('Error adding item:', error);
            });
        } else {
            // If any field is missing, show error
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add Medicine</Text>

            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />

            <TextInput
                style={styles.input}
                placeholder="Batch No"
                value={batchNo}
                onChangeText={setBatchNo}
            />

            <TextInput
                style={styles.input}
                placeholder="Expiry Date (YYYY-MM-DD)"
                value={expiryDate}
                onChangeText={setExpiryDate}
            />

            <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
            />

            <TextInput
                style={styles.input}
                placeholder="Barcode Number"
                keyboardType="numeric"
                value={barcode}
                onChangeText={setBarcode}
            />

            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />

            <Button title="Add Medicine" onPress={handleAddItem} color="green" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#4CAF50'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    }
});

export default AddItems;
