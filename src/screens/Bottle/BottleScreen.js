import React from 'react';
import { ScrollView, Text, View, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import { getBottleType } from '../../services/services';
import RemoveBottle from '../../components/RemoveButton/RemoveBottle';

export default function BottleScreen(props) {
    const { route, navigation } = props;
    const { item } = route.params;

    const window = useWindowDimensions();

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
                        <Text style={styles.wineName}>{item.year}</Text>

                        <View style={styles.infoContainerCentered}>
                            <MaterialCommunityIcons name="fruit-grapes" size={24} color="black" />
                            <Text style={styles.infoWine}>{item.terroir} </Text>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {/*<AddBottle />*/}
                            <RemoveBottle />
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 5,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Informations</Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.subInfoTitle}>{getBottleType(item)}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontSize: 16, textAlign: 'justify' }}>{item.description}</Text>
                    </View>

                    <View style={styles.subInfoContainer}>
                        <Text style={styles.subInfoTitle}>Volume d'alcool :</Text>
                        <Text style={{ fontSize: 16 }}>{item.abv.toFixed(1)}</Text>
                    </View>

                    {item.awards && item.awards.length > 0 && (
                        <View style={styles.subInfoContainer}>
                            <Text style={styles.subInfoTitle}>Récompenses :</Text>
                            <Text style={{ fontSize: 16 }}>{item.awards.join(',')}</Text>
                        </View>
                    )}

                    {item.conservation && (
                        <>
                            <View style={styles.subInfoContainer}>
                                <Text style={styles.subInfoTitle}>Conservation :</Text>
                            </View>
                            <View style={styles.minorDescriptionContainer}>
                                <Text style={{ fontSize: 16 }}>{item.conservation}</Text>
                            </View>
                        </>
                    )}

                    {item.tastingSuggestions && (
                        <>
                            <View style={styles.subInfoContainer}>
                                <Text style={styles.subInfoTitle}>Conseils de dégustation :</Text>
                            </View>
                            <View style={styles.minorDescriptionContainer}>
                                <Text style={{ fontSize: 16 }}>{item.tastingSuggestions}</Text>
                            </View>
                        </>
                    )}

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
                            <Text style={styles.subInfoTitle}>Notes :</Text>
                            <Text style={{ fontSize: 16 }}>{item.notes}</Text>
                        </View>
                    )}

                    <View style={styles.subInfoContainer}>
                        <Text style={styles.subInfoTitle}>Emplacement :</Text>
                        <Text style={{ fontSize: 16 }}>{item.cellar}</Text>
                    </View>
                    <View style={styles.subInfoContainer}>
                        <Text style={styles.subInfoTitle}>Quantité :</Text>
                        <Text style={{ fontSize: 16 }}>{item.quantity}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
