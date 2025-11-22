import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pharmacy Inventory Management</Text>
            
            {/* QR Scanner Button */}
            <TouchableOpacity
                style={[styles.button, styles.BarcodeScanner]}
                onPress={() => navigation.navigate('QRScanner')}  
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>📱 QR Scanner</Text>  {/* Text for QR Scanner button */}
            </TouchableOpacity>
            
            {/* Other Buttons */}
            <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => navigation.navigate('AddItems')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>➕ Add Items</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.viewButton]}
                onPress={() => navigation.navigate('MedicineList')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>📋 View Medicines</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => navigation.navigate('UpdateStock')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>🔄 Update Stock</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.expiredButton]}
                onPress={() => navigation.navigate('ExpiredMedicinesScreen')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>⚠️ Expired Medicines</Text>
            </TouchableOpacity>

            {/* Low Stock Alert Button */}
            <TouchableOpacity
                style={[styles.button, styles.lowStockButton]}
                onPress={() => navigation.navigate('LowStockAlert')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>📉 Low Stock Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.qrScannerButton]}
                onPress={() => navigation.navigate('Delete')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}> Delete </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1565C0',
        marginBottom: 40,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    button: {
        width: '90%',
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    addButton: {
        backgroundColor: '#4CAF50',
    },
    viewButton: {
        backgroundColor: '#2196F3',
    },
    updateButton: {
        backgroundColor: '#FFB300',
    },
    expiredButton: {
        backgroundColor: '#D32F2F',
    },
    lowStockButton: {
        backgroundColor: '#FFA726', 
    },
    BarcodeScanner: {
        backgroundColor: '#4CAF50',  
    },
   qrScannerButton: {  
    backgroundColor: '#2196F3',  
},


    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});

export default Dashboard;
