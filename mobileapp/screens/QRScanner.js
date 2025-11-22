import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, StyleSheet, View, TouchableOpacity } from 'react-native'; import axios from 'axios';
import { CameraView, useCameraPermissions } from "expo-camera";

const QRScanner = () => {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [medicineDetails, setMedicineDetails] = useState(null); 

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to access the camera</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const handleScan = ({ data, type }) => {
        if (!scanned) {
            setScanned(true);
            
            axios.get(`http://192.168.0.18:3000/medicine-by-barcode/${data}`)
                .then((response) => {
                    setMedicineDetails(response.data);
                    Alert.alert("Scanned Data", `${data}`);
                })
                .catch((error) => {
                    console.error("Error fetching medicine details:", error);
                    Alert.alert("Error", "Failed to fetch medicine details");
                });

            setTimeout(() => setScanned(false), 3000);
        }
    };

    const toggleCameraFacing = () => {
        setFacing(prev => (prev === "back" ? "front" : "back"));
    };

    return (
        <SafeAreaView style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code39", "code128"]
                }}
                onBarcodeScanned={handleScan}
            >
                <View style={styles.overlay}>
                    <View style={styles.scanArea} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.buttonText}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

            {medicineDetails && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Medicine Details:</Text>
                    <Text style={styles.detailsText}><Text style={styles.bold}>Name:</Text> {medicineDetails.name}</Text>
                    <Text style={styles.detailsText}><Text style={styles.bold}>Batch No:</Text> {medicineDetails.batch_no}</Text>
                    <Text style={styles.detailsText}><Text style={styles.bold}>Expiry Date:</Text> {medicineDetails.expiry_date}</Text>
                    <Text style={styles.detailsText}><Text style={styles.bold}>Quantity:</Text> {medicineDetails.quantity}</Text>
                    <Text style={styles.detailsText}><Text style={styles.bold}>Price:</Text> {medicineDetails.price}</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    message: { textAlign: "center", marginTop: 20 },
    camera: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center"
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    scanArea: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10
    },
    detailsContainer: {
        position: "absolute",
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        elevation: 3
    },
    detailsText: {
        fontSize: 16,
        color: '#333'
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default QRScanner;
