import axios from 'axios';
import { getToken } from '../services/token.service';
import qs from 'qs';

export async function addBottle(data) {
    try {
        const token = await getToken();
        const config = {
            method: 'post',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/bottle/',
            headers: {
                Authorization: `Bearer ${token}`,
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
