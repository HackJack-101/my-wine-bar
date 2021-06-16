import React, { useState, useContext, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    View,
    Switch,
    ScrollView,
    Image,
    Pressable,
    Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { addBottle } from '../../entities/bottle.entity';
import i18n from '../../data/i18n';
import styles from './styles';
import SelectComponent from '../../components/Select/select.component';
import { names } from '../../data/countries';
import {
    getCategoryPlaceholder,
    getNamePlaceholder,
    getCastlePlaceholder,
    getTerroirPlaceholder,
    getABVPlaceholder,
} from '../../data/placeholders';

export default function BottleFormScreen({ navigation, route }) {
    const _ean13 = route.params ? route.params.ean13 || '' : '';

    const [name, onChangeName] = useState();
    const [abv, onChangeABV] = useState('');
    const [awards, onChangeAwards] = useState('');
    const [castle, onChangeCastle] = useState('');
    const [category, onChangeCategory] = useState();
    const [cellar, onChangeCellar] = useState();
    const [composition, onChangeComposition] = useState('');
    const [conservation, onChangeConservation] = useState('');
    const [containsSulfites, onChangeContainsSulfites] = useState(false);
    const [country, onChangeCountry] = useState('FR');
    const [description, onChangeDescription] = useState();
    const [ean13, onChangeEAN13] = useState(_ean13);
    const [isOrganic, onChangeIsOrganic] = useState(false);
    const [notes, onChangeNotes] = useState();
    const [otherType, onChangeOtherType] = useState();
    const [photo, onChangePhoto] = useState();
    const [quantity, onChangeQuantity] = useState();
    const [tastingSuggestions, onChangeTastingSuggestions] = useState();
    const [terroir, onChangeTerroir] = useState();
    const [type, onChangeType] = useState('wine');
    const [wineColor, onChangeWineColor] = useState('red');
    const [year, onChangeYear] = useState();

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            exif: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            exif: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const toggleOrganic = () => onChangeIsOrganic((previousState) => !previousState);
    const toggleSulfites = () => onChangeContainsSulfites((previousState) => !previousState);
    const types = [
        { label: i18n.t('wine'), value: 'wine' },
        { label: i18n.t('cider'), value: 'cider' },
        { label: i18n.t('beer'), value: 'beer' },
        { label: i18n.t('liqueur'), value: 'liqueur' },
        { label: i18n.t('spirit'), value: 'spirit' },
        { label: i18n.t('other'), value: 'other' },
    ];
    const wineColors = [
        { label: i18n.t('red'), value: 'red' },
        { label: i18n.t('white'), value: 'white' },
        { label: i18n.t('rose'), value: 'rose' },
        { label: i18n.t('gray'), value: 'gray' },
        { label: i18n.t('yellow'), value: 'yellow' },
        { label: i18n.t('tawny'), value: 'tawny' },
        { label: i18n.t('orange'), value: 'orange' },
    ];
    const countries = Object.keys(names).map((key) => ({ label: names[key], value: key }));

    const addNewBottle = async (data) => {
        await addBottle(data);
        return navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="height">
            <ScrollView style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>{i18n.t('newBottle')}</Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable onPress={pickImage}>
                            <MaterialCommunityIcons name="image-plus" size={42} color="black" />
                        </Pressable>
                        <Pressable onPress={takePicture}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={42} color="black" />
                        </Pressable>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>

                    <Text>Type d'alcool</Text>
                    <SelectComponent onChangeValue={onChangeType} selected={type} values={types} />

                    {type === 'other' && (
                        <TextInput
                            placeholder={i18n.t('type')}
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            onChangeText={(text) => onChangeOtherType(text)}
                            value={otherType}
                            autoCompleteType="name"
                            textContentType="name"
                            autoCapitalize="words"
                        />
                    )}
                    {type === 'wine' && (
                        <>
                            <Text>Couleur de vin</Text>
                            <SelectComponent
                                onChangeValue={onChangeWineColor}
                                selected={wineColor}
                                values={wineColors}
                            />
                        </>
                    )}

                    <Text>{i18n.t('category')}</Text>
                    <TextInput
                        placeholder={getCategoryPlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeCategory(text)}
                        value={category}
                        autoCompleteType="name"
                        textContentType="name"
                        autoCapitalize="words"
                    />

                    <Text>{i18n.t('name')}</Text>
                    <TextInput
                        placeholder={getNamePlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeName(text)}
                        value={name}
                        autoCompleteType="name"
                        textContentType="name"
                        autoCapitalize="words"
                    />

                    {type !== 'beer' && (
                        <>
                            <Text>{i18n.t('castle')}</Text>
                            <TextInput
                                placeholder={getCastlePlaceholder(type)}
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput}
                                onChangeText={(text) => onChangeCastle(text)}
                                value={castle}
                                autoCompleteType="name"
                                textContentType="name"
                                autoCapitalize="words"
                            />
                        </>
                    )}

                    <Text>{i18n.t('terroir')}</Text>
                    <TextInput
                        placeholder={getTerroirPlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeTerroir(text)}
                        value={terroir}
                        autoCompleteType="name"
                        textContentType="name"
                        autoCapitalize="words"
                    />

                    <Text>{i18n.t('year')}</Text>
                    <TextInput
                        placeholder={'1995, 2006, 2009, 2012...'}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeYear(text)}
                        value={year}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <Text>{i18n.t('country')}</Text>
                    <SelectComponent onChangeValue={onChangeCountry} selected={country} values={countries} />

                    <Text>{i18n.t('abv')}</Text>
                    <TextInput
                        placeholder={getABVPlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeABV(text)}
                        value={abv}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text>{i18n.t('organic')}</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor="#f4f3f4"
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleOrganic}
                            value={isOrganic}
                        />
                    </View>

                    {type === 'wine' && (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 15,
                            }}>
                            <Text>{i18n.t('containsSulfites')}</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor="#f4f3f4"
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSulfites}
                                value={containsSulfites}
                            />
                        </View>
                    )}

                    <Text>{i18n.t('barcode')}</Text>
                    <TextInput
                        placeholder="3520727918800"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeEAN13(text)}
                        value={ean13}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <Text>{i18n.t('description')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeDescription(text)}
                        value={description}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={5}
                    />
                    <Text>{i18n.t('composition')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeComposition(text)}
                        value={composition}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={3}
                    />
                    <Text>{i18n.t('awards')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeAwards(text)}
                        value={awards}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={3}
                    />
                    <Text>{i18n.t('conservation')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeConservation(text)}
                        value={conservation}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={5}
                    />
                    <Text>{i18n.t('tastingSuggestions')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeTastingSuggestions(text)}
                        value={tastingSuggestions}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={5}
                    />
                    <Text>{i18n.t('notes')}</Text>
                    <TextInput
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeNotes(text)}
                        value={notes}
                        multiline={true}
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="sentences"
                        numberOfLines={5}
                    />

                    <Button
                        buttonStyle={styles.loginButton}
                        onPress={() =>
                            addNewBottle({
                                name,
                                abv,
                                awards,
                                castle,
                                category,
                                cellar,
                                composition,
                                conservation,
                                containsSulfites,
                                country,
                                description,
                                ean13,
                                isOrganic,
                                notes,
                                otherType,
                                photo,
                                quantity,
                                tastingSuggestions,
                                terroir,
                                type,
                                wineColor,
                                year,
                                image,
                            })
                        }
                        title="Save"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
