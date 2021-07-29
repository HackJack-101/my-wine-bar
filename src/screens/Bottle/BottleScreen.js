import React, { useState } from 'react';
import { ScrollView, Text, View, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';

import styles from './styles';
import { getBottleType, getCountryFlag } from '../../services/services';
import Quantity from '../../components/Quantity/Quantity';
import i18n from '../../data/i18n';
import { addOne, removeOne } from '../../entities/bottle.entity';

export default function BottleScreen(props) {
    const { route, navigation } = props;
    const { item } = route.params;

    const [quantity, onQuantityChange] = useState(item.quantity);

    const window = useWindowDimensions();

    const addOneBottle = async () => {
        onQuantityChange(quantity + 1);
        await addOne(item._id);
    };

    const removeOneBottle = async () => {
        if (quantity > 0) {
            onQuantityChange(quantity - 1);
            await removeOne(item._id);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.photoContainer}>
                    <Image
                        style={{ height: window.height - 400, resizeMode: 'contain' }}
                        source={{ uri: item.photo }}
                    />
                </View>
                <View style={styles.infoWineContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.wineName}>{item.name}</Text>

                        <Text style={styles.wineCastle}>{item.castle}</Text>

                        {item.terroir && (
                            <View style={styles.infoContainerCentered}>
                                <MaterialCommunityIcons name="fruit-grapes" size={24} color="black" />
                                <Text style={styles.infoWine}>{item.terroir} {getCountryFlag(item.country)}</Text>
                            </View>
                        )}

                        <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'space-between' }}>
                            {item.abv && (
                                <View style={styles.infoContainerCentered}>
                                    <MaterialCommunityIcons name="percent-outline" size={24} color="black" />
                                    <Text style={styles.infoWine}>{item.abv.toFixed(1)}</Text>
                                </View>
                            )}

                            {item.year && (
                                <View style={styles.infoContainerCentered}>
                                    <MaterialCommunityIcons name="calendar-blank" size={24} color="black" />
                                    <Text style={styles.infoWine}>{item.year}</Text>
                                </View>
                            )}

                            {item.volume && (
                                <View style={styles.infoContainerCentered}>
                                    <MaterialCommunityIcons name="bottle-wine" size={24} color="black" />
                                    <Text style={styles.infoWine}>{item.volume} mL</Text>
                                </View>
                            )}
                        </View>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Quantity quantity={quantity} onPlusAction={addOneBottle} onMinusAction={removeOneBottle} />
                        </View>
                    </View>

                    <Card mode="outlined" style={styles.card}>
                        <Card.Title title={getBottleType(item)} />
                        <Card.Content>
                            <Paragraph>{item.description}</Paragraph>
                        </Card.Content>
                    </Card>

                    {item.conservation ? (
                        <Card mode="outlined" style={styles.card}>
                            <Card.Title title={i18n.t('conservation')} />
                            <Card.Content>
                                <Paragraph>{item.conservation}</Paragraph>
                            </Card.Content>
                        </Card>
                    ) : null}

                    {item.tastingSuggestions && (
                        <Card mode="outlined" style={styles.card}>
                            <Card.Title title={i18n.t('tastingSuggestions')} />
                            <Card.Content>
                                <Paragraph>{item.tastingSuggestions}</Paragraph>
                            </Card.Content>
                        </Card>
                    )}

                    {item.awards ? (
                        <Card mode="outlined" style={styles.card}>
                            <Card.Title title={i18n.t('awards')} />
                            <Card.Content>
                                <Paragraph>{item.awards}</Paragraph>
                            </Card.Content>
                        </Card>
                    ) : null}

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 5,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Ma cave</Text>
                    </View>

                    {item.notes && (
                        <View style={styles.subInfoContainer}>
                            <Text style={styles.subInfoTitle}>{i18n.t('notes')} :</Text>
                            <Text style={{ fontSize: 16 }}>{item.notes}</Text>
                        </View>
                    )}

                    <View style={styles.subInfoContainer}>
                        <Text style={styles.subInfoTitle}>Emplacement :</Text>
                        <Text style={{ fontSize: 16 }}>{item.cellar}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
