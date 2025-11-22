import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MedicineListScreen = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.0.18:3000/medicines')
            .then(response => {
                setMedicines(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching medicines:', error);
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.medicineItem}>
            <Text style={styles.text}><Text style={styles.bold}>Name:</Text> {item.name}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Batch No:</Text> {item.batch_no}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Expiry Date:</Text> {item.expiry_date}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Quantity:</Text> {item.quantity}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Barcode:</Text> {item.barcode}</Text> {/* Added barcode */}
            <Text style={styles.text}><Text style={styles.bold}>Price:</Text> {item.price}</Text>  {/* Added price */}
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
            ) : (
                <FlatList
                    data={medicines}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    medicineItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3
    },
    text: {
        fontSize: 16,
        color: '#333'
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default MedicineListScreen;
