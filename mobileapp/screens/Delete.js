import React, { useState } from 'react';
import { SafeAreaView, Text, Button, Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { CameraView, useCameraPermissions } from "expo-camera";

const Delete = () => {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [deletedBarcode, setDeletedBarcode] = useState(null);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to access the camera</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const handleScan = async ({ data, type }) => {
        if (!scanned) {
            setScanned(true);
            try {
                await axios.delete(`http://192.168.0.18:3000/medicine/${data}`);
                setDeletedBarcode(data);
                Alert.alert("Deleted", `Medicine with barcode ${data} deleted successfully`);
            } catch (error) {
                console.error("Error deleting medicine:", error);
                Alert.alert("Error", "Failed to delete medicine");
            }

            setTimeout(() => {
                setScanned(false);
                setDeletedBarcode(null);
            }, 3000);
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

            {deletedBarcode && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>
                        ✅ Medicine with barcode <Text style={styles.bold}>{deletedBarcode}</Text> deleted successfully.
                    </Text>
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
        backgroundColor: "red",
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

export default Delete;
