import React, {Component} from "react";
import styles from "../styles/index.style";
import {
	Text,
	Animated,
	View
} from 'react-native';

export default class EventDetails extends Component {
	
	state = {
		bottom: new Animated.Value(-100),
		
	};
	
	componentDidMount(){
		Animated.timing(this.state.bottom, {
			duration: 500,
			toValue: 0
		}).start();
	}
	
	render(){
		const {data} = this.props;
		return <Animated.View style={[
			styles.activeEvent,
			{
				bottom:this.state.bottom
			}
		]}>
			<View>
				<Text numberOfLines={1} style={styles.title}>{data.title}</Text>
				<Text numberOfLines={1} style={styles.subtitle}>{data.location}</Text>
				<Text numberOfLines={1} style={styles.subtitle}>{data.date}</Text>
			</View>
			<View
				style={{
					borderBottomColor: 'black',
					borderBottomWidth: 1,
					paddingTop:10,
					paddingBottom:10
				}}
			/>
		</Animated.View>
	}
}