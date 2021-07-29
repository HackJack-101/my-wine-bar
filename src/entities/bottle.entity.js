import axios from 'axios';
import { getToken } from '../services/token.service';
import qs from 'qs';

export async function getS3UploadImage(key) {
    try {
        const token = await getToken();
        const config = {
            method: 'get',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/bottle/uploadImage/' + key,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function uploadImage(params, image, key, ext) {
    try {
        console.log({ image });

        const config = {
            method: 'post',
            url: params.url,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        let data = new FormData();
        Object.entries(params.fields).forEach(([field, value]) => {
            data.append(field, value);
        });
        data.append('acl', 'public-read');
        data.append('file', { uri: image.uri, name: key, type: `image/${ext}` });
        config.data = data;

        await axios(config).catch((err) => console.warn(err, err.response));
        return params.url + '/' + key;
    } catch (error) {
        console.error(error);
    }
}

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
            return response.data;
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function addOne(id) {
    try {
        const token = await getToken();
        const config = {
            method: 'get',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/bottle/' + id + '/add',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeOne(id) {
    try {
        const token = await getToken();
        const config = {
            method: 'get',
            url: 'https://wine-bar-api.cleverapps.io/api/v1/bottle/' + id + '/remove',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.log(error);
    }
}
