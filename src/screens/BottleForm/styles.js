const React = require('react-native');

const { StyleSheet } = React;

export default {
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
        padding: 5,
    },
    logoText: {
        fontSize: 40,
        fontWeight: '800',
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1,
    },
    textInput: {
    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    question: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
        color: '#797979',
    },
    link: {
        color: '#009ede',
        textAlign: 'center',
    },
    picker: {
        borderColor: '#797979',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#fafafa',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
};
