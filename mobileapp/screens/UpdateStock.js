import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const UpdateStock = () => {
    const [quantity, setQuantity] = useState('');
    const [barcode, setBarcode] = useState('');  
    const [price, setPrice] = useState(''); 

    const handleUpdateStock = () => {
        if (quantity && barcode && price) {  // Check for all required fields
            axios.put(`http://192.168.0.18:3000/update-stock`, {
                quantity: quantity,
                barcode: barcode,  
                price: price       
            })
            .then(() => {
                Alert.alert('Success', 'Stock updated successfully.');
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to update stock.');
                console.error('Error updating stock:', error);
            });
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Update Stock</Text>

            <TextInput
                style={styles.input}
                placeholder="New Quantity"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
            />

            <TextInput
                style={styles.input}
                placeholder="Barcode"
                keyboardType="default"
                value={barcode}
                onChangeText={setBarcode}  // Handle barcode input
            />

            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}  // Handle price input
            />

            <Button title="Update Stock" onPress={handleUpdateStock} color="orange" />
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
        color: '#FF9800'
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

export default UpdateStock;
