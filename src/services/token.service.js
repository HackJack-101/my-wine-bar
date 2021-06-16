import * as SecureStore from 'expo-secure-store';

export async function setToken(value) {
    await SecureStore.setItemAsync('token', value);
}

export async function getToken() {
    return await SecureStore.getItemAsync('token');
}
