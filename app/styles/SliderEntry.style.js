import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../styles/index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight - 200; //* 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 3;

const entryBorderRadius = 8;
export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        borderTopLeftRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderBottomLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius
    },
});
