import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getWineByEan13 } from '../../services/services';

export default function BarcodeScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const askForCreation = (ean13) =>
        Alert.alert(
            'Bouteille inconnue',
            'Voulez-vous créer une nouvelle bouteille dans votre cave ?',
            [
                {
                    text: 'Non',
                    onPress: () => false,
                    style: 'cancel',
                },
                { text: 'Oui', onPress: () => navigation.navigate('BottleForm', { ean13 }) },
            ],
            { cancelable: false },
        );

    const askForAction = (item) =>
        Alert.alert(
            'Bouteille connue',
            'Voulez-vous afficher la fiche de la bouteille ou appliquer une action ?',
            [
                {
                    text: 'Voir la fiche',
                    onPress: () => false,
                    style: 'cancel',
                },
                { text: 'Ajouter', onPress: () => navigation.navigate('Bottle', { item }) },
                { text: 'Retirer', onPress: () => navigation.navigate('Bottle', { item }) },
            ],
            { cancelable: true },
        );

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // TODO call API by EAN
        const item = getWineByEan13(data);
        if (item) {
            askForAction(item);
        } else {
            askForCreation(data);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
                type={BarCodeScanner.Constants.Type.back}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
