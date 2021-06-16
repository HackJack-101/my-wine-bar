import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 20,
    },
    photoContainer: {
        minHeight: 400,
    },
    carousel: {},

    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 250,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        width: viewportWidth,
        height: 250,
    },
    paginationContainer: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: 8,
        marginTop: 200,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 0,
    },
    infoWineContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
    },
    minorDescriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 0,
    },
    infoContainerCentered: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoPhoto: {
        height: 20,
        width: 20,
        marginRight: 0,
    },
    infoWine: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    category: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10,
        color: '#2cd18a',
    },
    wineDescription: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 30,
        margin: 15,
    },
    wineName: {
        flex: 1,
        fontSize: 28,
        margin: 10,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    wineYear: {
        flex: 1,
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    subInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
    },
    subInfoTitle: {
        fontWeight: 'bold',
        paddingRight: 2,
        fontSize: 16,
    },
});

export default styles;
