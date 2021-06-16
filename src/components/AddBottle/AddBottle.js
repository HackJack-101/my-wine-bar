import * as React from 'react';
import { Button } from 'react-native-paper';

export default function () {
    return (
        <Button icon="plus" mode="contained" onPress={() => console.log('Plus')}>
            Ajouter une bouteille
        </Button>
    );
}
