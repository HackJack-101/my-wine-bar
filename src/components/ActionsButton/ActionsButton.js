import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

import i18n from '../../data/i18n';

export default function (props) {
    const [open, onOpen] = useState(false);

    return (
        <FAB.Group
            open={open}
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
                {
                    icon: 'barcode',
                    label: i18n.t('scanBottle'),
                    onPress: props.onScan,
                },
                { icon: 'plus', label: i18n.t('addBottle'), onPress: props.onAddBottle },
                {
                    icon: 'store',
                    label: i18n.t('manageCellars'),
                    onPress: props.onScan,
                },
            ]}
            onStateChange={onOpen}
            onPress={() => {
                if (open) {
                    // do something if the speed dial is open
                }
            }}
        />
    );
}
