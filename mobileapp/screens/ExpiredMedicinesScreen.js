import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function ExpiredMedicinesScreen() {
    const [expiredMedicines, setExpiredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://192.168.0.18:3000/expired-medicines')
            .then((response) => response.json())
            .then((data) => {
                setExpiredMedicines(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', 'Failed to fetch expired medicines.');
                console.error('Error fetching expired medicines:', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Batch No: {item.batch_no}</Text>
            <Text style={styles.text}>Expiry Date: {item.expiry_date}</Text>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>
            <Text style={styles.text}>Barcode: {item.barcode}</Text>
            <Text style={styles.text}>Price: {item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Expired Medicines</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={expiredMedicines}
                    keyExtractor={(item) => item.batch_no}  // Assuming batch_no is unique
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.emptyText}>No expired medicines found.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f8ff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    card: { 
        backgroundColor: '#fff', 
        padding: 15, 
        marginBottom: 10, 
        borderRadius: 8, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4 
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
});
