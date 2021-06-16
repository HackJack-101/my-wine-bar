import React, { useReducer, useMemo, createContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import HomeScreen from './screens/Home/HomeScreen';
import BottleScreen from './screens/Bottle/BottleScreen';
import BarcodeScannerScreen from './screens/BarcodeScanner/BarcodeScannerScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import SplashScreen from './screens/Splash/SplashScreen';

import { getToken, setToken } from './services/token.service';
import { signIn, signUp } from './entities/user.entity';

import AuthContext from './context/auth.context';
import i18n from './data/i18n';
import BottleFormScreen from './screens/BottleForm/BottleFormScreen';

const Stack = createStackNavigator();

export default function App({}) {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        token: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        token: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        token: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            token: null,
        },
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let token;

            try {
                token = await getToken();
            } catch (e) {
                await setToken(null);
                return dispatch({ type: 'SIGN_OUT' });
            }

            if (token) {
                // After restoring token, we may need to validate it in production apps
                // TODO get user me
            }
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            return dispatch({ type: 'RESTORE_TOKEN', token: token });
        };

        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (email, password) => {
                // We will also need to handle errors if sign in failed
                const token = await signIn(email, password);
                if (token) {
                    dispatch({ type: 'SIGN_IN', token });
                }
            },
            signOut: async () => {
                await setToken('');
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data) => {
                console.log('signUp', data);
                await signUp(data);
                dispatch({ type: 'SIGN_OUT' });
            },
        }),
        [],
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : !state.token ? (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    title: i18n.t('loginPage'),
                                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{
                                    title: i18n.t('registerPage'),
                                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={({ navigation }) => ({
                                    title: i18n.t('myCellar'),
                                    headerRight: () => (
                                        <Feather onPress={authContext.signOut} name="log-out" size={32} />
                                    ),
                                })}
                            />
                            <Stack.Screen
                                name="Bottle"
                                component={BottleScreen}
                                options={() => ({
                                    title: i18n.t('bottle'),
                                })}
                            />

                            <Stack.Screen
                                name="BottleForm"
                                component={BottleFormScreen}
                                options={() => ({
                                    title: i18n.t('bottle'),
                                })}
                            />
                            <Stack.Screen
                                name="BarcodeScanner"
                                component={BarcodeScannerScreen}
                                options={() => ({
                                    title: i18n.t('scanBottle'),
                                })}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
