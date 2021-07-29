import * as React from 'react';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function ({ quantity = 0, onPlusAction, onMinusAction }) {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button
                mode="contained"
                compact={true}
                onPress={onMinusAction}
                uppercase={false}
                style={{ width: 42 }}
                disabled={quantity < 1}>
                <MaterialCommunityIcons name="minus" size={24} color="white" />
            </Button>
            <Button mode="text" compact={true} style={{ width: 42, borderRadius: 0 }}>
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
            </Button>
            <Button mode="contained" compact={true} onPress={onPlusAction} uppercase={false} style={{ width: 42 }}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
            </Button>
        </View>
    );
}
