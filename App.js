import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Sentry from 'sentry-expo';

import App from './src/App';

Sentry.init({
    dsn: 'https://f5d3e957ff244f55ae4fc3a5c355a067@o509457.ingest.sentry.io/5604388',
    enableInExpoDevelopment: true,
    debug: true,
});

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        accent: '#671b1b',
    },
};

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}
