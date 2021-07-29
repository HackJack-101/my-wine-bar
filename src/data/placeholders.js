import i18n from './i18n';

export function getCategoryPlaceholder(type) {
    switch (type) {
        case 'wine':
            return 'Sec, brut, moelleux, liquoreux...';
        case 'beer':
            return 'Pale Ale, IPA, ambrée...';
        case 'cider':
            return 'Brut, doux, fermier...';
        case 'spirit':
            return 'Rhum, vodka, whisky...';
        case 'liqueur':
            return 'Absinthe, Chartreuse, Jägermeister...';
        case 'other':
        default:
            return i18n.t('category');
    }
}
export function getNamePlaceholder(type) {
    switch (type) {
        case 'wine':
            return 'Le Baron de Brane';
        case 'beer':
            return 'La Blanche';
        case 'cider':
            return 'Cuvée de réserve, Cidre de dégustation...';
        case 'spirit':
            return 'Rhum, vodka, whisky...';
        case 'liqueur':
            return 'Absinthe, Chartreuse, Jägermeister...';
        case 'other':
        default:
            return i18n.t('category');
    }
}

export function getCastlePlaceholder(type) {
    switch (type) {
        case 'wine':
            return 'Château Brane Cantenac';
        case 'beer':
            return 'La Brasserie du Mont-Blanc';
        case 'cider':
            return 'Loïc Raison, Sassy, Magners...';
        case 'spirit':
            return 'Rhum, vodka, whisky...';
        case 'liqueur':
            return 'Absinthe, Chartreuse, Jägermeister...';
        case 'other':
        default:
            return i18n.t('category');
    }
}

export function getTerroirPlaceholder(type) {
    switch (type) {
        case 'wine':
            return 'Margaux, Bordeaux supérieur...';
        case 'beer':
            return i18n.t('terroir');
        case 'cider':
            return 'Normandie, Bretagne...';
        case 'spirit':
            return i18n.t('terroir');
        case 'liqueur':
            return i18n.t('terroir');
        case 'other':
        default:
            return i18n.t('terroir');
    }
}

export function getABVPlaceholder(type) {
    switch (type) {
        case 'wine':
            return '14°';
        case 'beer':
            return '4,5°';
        case 'cider':
            return '5°';
        case 'spirit':
            return '42°';
        case 'liqueur':
            return '18°';
        case 'other':
        default:
            return '12°';
    }
}

export function getVolumePlaceholder(type) {
    switch (type) {
        case 'wine':
            return '750';
        case 'beer':
            return '330';
        case 'cider':
            return '750';
        case 'spirit':
            return '500';
        case 'liqueur':
            return '500';
        case 'other':
        default:
            return '250';
    }
}
