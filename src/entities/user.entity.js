import qs from 'qs';
import axios from 'axios';
import { setToken } from '../services/token.service';

export async function signIn(email, password) {
    try {
        const config = {
            method: 'post',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/auth/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        config.data = qs.stringify({
            email,
            password,
        });

        const response = await axios(config);

        if (response.data && response.data.token) {
            await setToken(response.data.token);

            return response.data.token;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

export async function signUp(data) {
    try {
        const config = {
            method: 'post',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/auth/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        config.data = qs.stringify(data);

        const response = await axios(config);
        if (response.data) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}
