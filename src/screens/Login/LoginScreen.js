import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';

import AuthContext from '../../context/auth.context';
import i18n from '../../data/i18n';

import styles from './styles';

export default function LoginScreen({ navigation }) {
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    const { signIn } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>My wine bar</Text>
                    <TextInput
                        placeholder={i18n.t('email')}
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        onChangeText={(text) => onChangeUsername(text)}
                        value={username}
                        keyboardType="email-address"
                        autoCompleteType="username"
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
                        onPress={() => signIn(username, password)}
                        title={i18n.t('login')}
                    />
                    <Text style={styles.question}>{i18n.t('newHere?')}</Text>
                    <View>
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}>{i18n.t('letsRegister')}</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.question}>{i18n.t('lostPassword?')}</Text>
                    <View>
                        <Pressable>
                            <Text style={styles.link}>{i18n.t('letsReset')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
