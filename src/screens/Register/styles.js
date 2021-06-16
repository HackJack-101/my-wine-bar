const React = require('react-native');

const { StyleSheet } = React;

export default {
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: '800',
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
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
    gender: {
        borderColor: '#797979',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#fafafa',
        marginLeft: 15,
        marginRight: 15,
    },
};
