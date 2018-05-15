import React, { Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };
    
    state = {
		bounceValue:new Animated.Value(1),
	};

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Animated.Image
              source={{ uri: illustration }}
              style={[
              	styles.image,
				 {transform: [{scale: this.state.bounceValue}]}
			  ]}
            />
        );
    }
	
	componentWillReceiveProps(nextProps){
		console.log(nextProps.reset, this.props.reset);
		if ((nextProps.reset !== this.props.reset) && nextProps.reset) {
			this._reset();
		}
	}
    
    _reset(){
		Animated.timing(this.state.bounceValue, {
			duration: 1000,
			toValue: 1
		}).start();
	}
 
	_gotToEvent(){
		Animated.timing(this.state.bounceValue, {
			duration: 1000,
			toValue: 1.65
		}).start();
		this.props.eventClicked()
    }

    render () {
    	const {data} = this.props;
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => this._gotToEvent()}
              >
                <View style={styles.imageContainer}>
                    { this.image }
                </View>
            </TouchableOpacity>
        );
    }
}
