import axios from 'axios';
import { getToken } from '../services/token.service';

export async function getCellar() {
    try {
        const token = await getToken();
        if (token) {
            let config = {
                method: 'get',
                url: 'https://wine-bar-api.cleverapps.io/api/v1/cellar/',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios(config);
            if (data && data.bottles) {
                return data.bottles.map((bottle) => {
                    bottle.cellar = data.name;
                    return bottle;
                });
            }

            return [];
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getSharedCellars() {
    try {
        const token = await getToken();
        if (token) {
            let config = {
                method: 'get',
                url: 'https://wine-bar-api.cleverapps.io/api/v1/cellar/shared',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios(config);
            if (data) {
                return data.reduce((bottles, cellar) => {
                    return bottles.concat(
                        cellar.bottles.map((bottle) => {
                            bottle.cellar = `${cellar.name} (${cellar.creator.name})`;
                            return bottle;
                        }),
                    );
                }, []);
            }

            return [];
        }
    } catch (error) {
        console.log(error);
    }
}

export async function listCellars() {
    try {
        const token = await getToken();
        if (token) {
            let config = {
                method: 'get',
                url: 'https://wine-bar-api.cleverapps.io/api/v1/cellar/list',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios(config);
            return data || [];
        }
    } catch (error) {
        console.log(error);
    }
}
