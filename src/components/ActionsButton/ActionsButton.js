import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

import i18n from '../../data/i18n';

export default function (props) {
    const [state, setState] = useState(false);

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'glass-wine' : 'plus'}
                    color="#ffffff"
                    fabStyle={{ backgroundColor: '#7F1734' }}
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
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            onStateChange(false);
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
}
