import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import AuthContext from '../../context/auth.context';
import i18n from '../../data/i18n';

import styles from './styles';

export default function RegisterScreen({ navigation }) {
    const [name, onChangeName] = useState('');
    const [gender, onChangeGender] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    const { signUp } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>{i18n.t('register')}</Text>
                    <TextInput
                        placeholder="Name"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeName(text)}
                        value={name}
                        autoCompleteType="name"
                        textContentType="name"
                        autoCapitalize="words"
                    />
                    <Picker
                        style={styles.gender}
                        selectedValue={gender}
                        onValueChange={(itemValue) => onChangeGender(itemValue)}>
                        <Picker.Item label={i18n.t('non-binary')} value="non-binary" />
                        <Picker.Item label={i18n.t('female')} value="female" />
                        <Picker.Item label={i18n.t('male')} value="male" />
                    </Picker>
                    <TextInput
                        placeholder={i18n.t('email')}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeUsername(text)}
                        value={username}
                        keyboardType="email-address"
                        autoCompleteType="email"
                        textContentType="username"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder={i18n.t('password')}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        secureTextEntry={true}
                        autoCompleteType="password"
                        textContentType="password"
                        onChangeText={(text) => onChangePassword(text)}
                        value={password}
                    />
                    <Button
                        buttonStyle={styles.loginButton}
                        onPress={() => signUp({ name, gender, email: username, password })}
                        title={i18n.t('registerAction')}
                    />
                    <Text style={styles.question}>{i18n.t('alreadyRegistered?')}</Text>
                    <View>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>{i18n.t('letsSignUp')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
