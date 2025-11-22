import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

const LowStockAlert = () => {
    const [lowStockMedicines, setLowStockMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLowStock = async () => {
            try {
                const response = await fetch('http://192.168.0.18:3000/low-stock');
                const data = await response.json();

                if (response.ok) {
                    setLowStockMedicines(data);

                    const criticalItems = data.filter(item => item.low_stock);
                    if (criticalItems.length > 0) {
                        Alert.alert(
                            '⚠️ Urgent Restock Needed',
                            `${criticalItems.length} item(s) have critically low stock.`
                        );
                    }
                } else {
                    console.error('❌ Error:', data.error || data.message);
                    setLowStockMedicines([]);
                }
            } catch (error) {
                console.error('❌ Failed to fetch low stock data:', error);
                setLowStockMedicines([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLowStock();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (lowStockMedicines.length === 0) {
        return <Text>No low stock items found.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Low Stock Alert</Text>
            <FlatList
                data={lowStockMedicines}
                keyExtractor={(item) => item.batch_no}  // Using batch_no as key
                renderItem={({ item }) => (
                    <View style={[styles.item, item.low_stock && styles.critical]}>
                        <Text style={styles.text}>Name: {item.name}</Text>
                        <Text style={styles.text}>Batch No: {item.batch_no}</Text>
                        <Text style={styles.text}>Expiry Date: {item.expiry_date}</Text>
                        <Text style={styles.text}>Quantity: {item.quantity}</Text>
                        <Text style={styles.text}>Barcode: {item.barcode}</Text>
                        <Text style={styles.text}>Price: {item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#d32f2f',
    },
    item: {
        backgroundColor: '#fff3e0',
        padding: 12,
        marginVertical: 5,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#ffa726',
    },
    critical: {
        backgroundColor: '#ffebee',
        borderLeftColor: '#d32f2f',
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default LowStockAlert;
