import * as React from 'react';
import { Button } from 'react-native-paper';

export default function () {
    return (
        <Button icon="minus" mode="contained" onPress={() => console.log('Minus')} uppercase={false}>
            Retirer une bouteille
        </Button>
    );
}
