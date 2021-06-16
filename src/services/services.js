import { flags, names } from '../data/countries';

const wineColors = {
    red: 'rouge',
    white: 'blanc',
    rose: 'rosé',
    gray: 'gris',
    yellow: 'jaune',
    tawny: 'tawny',
    orange: 'orange',
};

export function getCountryFlag(countryCode) {
    return flags[countryCode];
}

export function getCountryName(countryCode) {
    return names[countryCode];
}

export function getWineByEan13(barcode) {
    return null;
}

export function getBottleType(item) {
    let result = [];
    if (item.type === 'wine') {
        result.push('Vin');
    } else if (item.type === 'champagne') {
        result.push('Champagne');
    }
    if (item.wineColor) {
        result.push(wineColors[item.wineColor]);
    }

    if (item.category) {
        result.push(item.category);
    }

    if (item.isOrganic) {
        result.push('biologique');
    }

    return result.join(' ');
}
