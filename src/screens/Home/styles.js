import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColumns = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 15,
    },
    redWine: {
        borderColor: '#722f37',
    },
    whiteWine: {
        borderColor: '#dbdd45',
    },
    menuCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        marginTop: 5,
        marginBottom: 0,
    },
});

export default styles;
