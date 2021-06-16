import React, { useEffect, useState } from 'react';
import { FlatList, View, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import styles from './styles';
import { getCountryFlag } from '../../services/services';
import ActionsButton from '../../components/ActionsButton/ActionsButton';
import { getCellar, getSharedCellars } from '../../entities/cellar.entity';

export default function HomeScreen({ navigation }) {
    const [bottles, onChangeBottles] = useState([]);

    useEffect(() => {
        (async () => {
            const defaultCellar = await getCellar();
            const sharedCellars = await getSharedCellars();
            onChangeBottles(defaultCellar.concat(sharedCellars));
        })();
    }, []);

    const onPressBottle = (item) => {
        navigation.navigate('Bottle', { item });
    };

    const onScanAction = () => {
        navigation.navigate('BarcodeScanner');
    };
    const onAddBottleAction = () => {
        navigation.navigate('BottleForm');
    };

    const renderBottle = ({ item }) => {
        let style = { ...styles.container };
        if (item.wineColor === 'red') {
            style.borderColor = styles.redWine.borderColor;
        } else if (item.wineColor === 'white') {
            style.borderColor = styles.whiteWine.borderColor;
        }

        return (
            <Card style={{ margin: 10 }} onPress={() => onPressBottle(item)}>
                <Card.Content style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={styles.photo} source={{ uri: item.photo }} />
                    <View style={{ flex: 3, width: '70%', padding: 0 }}>
                        <Title>{item.name}</Title>
                        <Paragraph>
                            {item.terroir} {getCountryFlag(item.country)}
                        </Paragraph>
                        {item.year ? <Paragraph>{item.year}</Paragraph> : null}
                    </View>
                </Card.Content>
            </Card>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={bottles}
                renderItem={renderBottle}
                keyExtractor={(item) => `${item._id}`}
            />
            <ActionsButton onScan={onScanAction} onAddBottle={onAddBottleAction} />
        </View>
    );
}
