import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, Text, View, Switch, ScrollView, Image, Pressable, Platform } from 'react-native';
import { Button, Input as TextInput } from 'react-native-elements';
import { Button as PaperButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'uuid-random';

import { addBottle, getS3UploadImage, uploadImage, addOne, removeOne } from '../../entities/bottle.entity';
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
    getVolumePlaceholder,
} from '../../data/placeholders';
import { listCellars } from '../../entities/cellar.entity';

export default function BottleFormScreen({ navigation, route }) {
    const _ean13 = route.params ? route.params.ean13 || '' : '';

    const [name, onChangeName] = useState();
    const [abv, onChangeABV] = useState('');
    const [awards, onChangeAwards] = useState('');
    const [castle, onChangeCastle] = useState('');
    const [category, onChangeCategory] = useState();
    const [cellar, onChangeCellar] = useState('');
    const [cellars, onChangeCellars] = useState([]);
    const [composition, onChangeComposition] = useState('');
    const [conservation, onChangeConservation] = useState('');
    const [containsSulfites, onChangeContainsSulfites] = useState(false);
    const [country, onChangeCountry] = useState('FR');
    const [description, onChangeDescription] = useState();
    const [ean13, onChangeEAN13] = useState(_ean13);
    const [isOrganic, onChangeIsOrganic] = useState(false);
    const [notes, onChangeNotes] = useState();
    const [otherType, onChangeOtherType] = useState();
    const [photo, onChangePhoto] = useState(); // Not used for now. Maybe for edition
    const [quantity, onChangeQuantity] = useState(1);
    const [tastingSuggestions, onChangeTastingSuggestions] = useState();
    const [terroir, onChangeTerroir] = useState();
    const [type, onChangeType] = useState('wine');
    const [volume, onChangeVolume] = useState();
    const [wineColor, onChangeWineColor] = useState('red');
    const [year, onChangeYear] = useState();

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const _cellars = await listCellars();
            onChangeCellars(_cellars.map((c) => ({ label: `${c.name} (${c.creator.name})`, value: c._id })));
            if (_cellars.length > 0) {
                onChangeCellar(_cellars[0]._id);
            }

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
            setImage(result);
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
            setImage(result);
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
        const ext = image.uri.substring(image.uri.lastIndexOf('.') + 1);

        const key = uuid() + '.' + ext;

        await getS3UploadImage(key)
            .then((params) => {
                return uploadImage(params, image, key, ext);
            })
            .then((photoURL) => {
                return addBottle({ ...data, photo: photoURL });
            })
            .catch(console.err);
        return navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="height" keyboardVerticalOffset={100}>
            <ScrollView style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>{i18n.t('newBottle')}</Text>
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <PaperButton mode="outlined" onPress={pickImage}>
                            <MaterialCommunityIcons name="image-plus" size={32} color="black" />
                        </PaperButton>
                        <PaperButton mode="outlined" onPress={takePicture}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={32} color="black" />
                        </PaperButton>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                    </View>

                    <Text>Type d'alcool</Text>
                    <SelectComponent onChangeValue={onChangeType} selected={type} values={types} />

                    {type === 'other' && (
                        <TextInput
                            mode="outlined"
                            placeholder={i18n.t('type')}
                            placeholderColor="#c4c3cb"
                            style={styles.textInput}
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

                    <TextInput
                        mode="outlined"
                        label={i18n.t('category')}
                        placeholder={getCategoryPlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeCategory(text)}
                        value={category}
                        autoCompleteType="name"
                        textContentType="name"
                    />

                    <TextInput
                        label={i18n.t('name')}
                        mode="outlined"
                        placeholder={getNamePlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeName(text)}
                        value={name}
                        autoCompleteType="name"
                        textContentType="name"
                    />

                    {type !== 'beer' && (
                        <>
                            <TextInput
                                label={i18n.t('castle')}
                                mode="outlined"
                                placeholder={getCastlePlaceholder(type)}
                                placeholderColor="#c4c3cb"
                                style={styles.textInput}
                                onChangeText={(text) => onChangeCastle(text)}
                                value={castle}
                                autoCompleteType="name"
                                textContentType="name"
                            />
                        </>
                    )}

                    <TextInput
                        label={i18n.t('year')}
                        mode="outlined"
                        placeholder={'1995, 2006, 2009, 2012...'}
                        placeholderColor="#c4c3cb"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeYear(text)}
                        value={year}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <TextInput
                        label={i18n.t('terroir')}
                        mode="outlined"
                        placeholder={getTerroirPlaceholder(type)}
                        placeholderColor="#c4c3cb"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeTerroir(text)}
                        value={terroir}
                        autoCompleteType="name"
                        textContentType="name"
                    />

                    <Text>{i18n.t('country')}</Text>
                    <SelectComponent onChangeValue={onChangeCountry} selected={country} values={countries} />

                    <TextInput
                        label={i18n.t('abv')}
                        mode="outlined"
                        placeholder={getABVPlaceholder(type)}
                        style={styles.textInput}
                        onChangeText={(text) => onChangeABV(text)}
                        value={abv}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <TextInput
                        label={i18n.t('volume')}
                        mode="outlined"
                        placeholder={getVolumePlaceholder(type)}
                        style={styles.textInput}
                        onChangeText={(text) => onChangeVolume(text)}
                        value={volume}
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

                    <TextInput
                        label={i18n.t('barcode')}
                        mode="outlined"
                        placeholder="3520727918800"
                        placeholderColor="#c4c3cb"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeEAN13(text)}
                        value={ean13}
                        keyboardType="numeric"
                        autoCompleteType="off"
                        textContentType="none"
                        autoCapitalize="none"
                    />

                    <TextInput
                        label={i18n.t('description')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeDescription(text)}
                        value={description}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <TextInput
                        label={i18n.t('composition')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeComposition(text)}
                        value={composition}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <TextInput
                        label={i18n.t('awards')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeAwards(text)}
                        value={awards}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <TextInput
                        label={i18n.t('conservation')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeConservation(text)}
                        value={conservation}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <TextInput
                        label={i18n.t('tastingSuggestions')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeTastingSuggestions(text)}
                        value={tastingSuggestions}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <TextInput
                        label={i18n.t('notes')}
                        mode="outlined"
                        style={styles.textInput}
                        onChangeText={(text) => onChangeNotes(text)}
                        value={notes}
                        multiline
                        autoCompleteType="off"
                        textContentType="none"
                        numberOfLines={3}
                    />

                    <Text>{i18n.t('cellar')}</Text>
                    <SelectComponent onChangeValue={onChangeCellar} selected={cellar} values={cellars} />

                    <Button
                        mode="contained"
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
