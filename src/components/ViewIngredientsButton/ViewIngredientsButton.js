import React from 'react';
import { Pressable, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class ViewIngredientsButton extends React.Component {
    render() {
        return (
            <Pressable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </Pressable>
        );
    }
}

ViewIngredientsButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
};
