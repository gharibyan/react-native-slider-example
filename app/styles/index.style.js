import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
    white:'#fff'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    title: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 5,
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 13,
        fontStyle: 'italic',
    },
    slider: {
        marginTop: 15,
        overflow: 'visible'
    },
	activeEvent:{
		zIndex:1,
		padding:10,
		position:'absolute',
		backgroundColor:"#fff",
		width:'100%',
	}
});
