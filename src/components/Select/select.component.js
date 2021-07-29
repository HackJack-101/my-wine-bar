import React from 'react';
import { ActionSheetIOS, Platform, Pressable, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

export default function SelectComponent({ values, selected, onChangeValue, debug = false }) {
    if (debug) {
        console.log(values);
    }
    if (Platform.OS === 'ios') {
        let title = selected;
        const foundValue = values.find(({ value }) => value === selected);
        if (foundValue) {
            title = foundValue.label;
        }
        const onPressType = () =>
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [...values.map(({ label }) => label), 'Cancel'],
                    cancelButtonIndex: values.length,
                    userInterfaceStyle: 'dark',
                },
                (buttonIndex) => {
                    if (buttonIndex === values.length) {
                    } else {
                        onChangeValue(values[buttonIndex].value);
                    }
                },
            );

        return (
            <Pressable
                onPress={onPressType}
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                ]}>
                <Text>{title}</Text>
            </Pressable>
        );
    } else {
        return (
            <View style={styles.picker}>
                <Picker selectedValue={selected} onValueChange={(itemValue) => onChangeValue(itemValue)}>
                    {values.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
        );
    }
}
