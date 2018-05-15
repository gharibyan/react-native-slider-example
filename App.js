import React, {Component} from 'react';
import {
	Text,
	SafeAreaView,
	Animated,
	View,
	TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './app/styles/SliderEntry.style';
import SliderEntry from './app/components/SliderEntry';
import EventDetails from './app/components/EventDetails';
import styles from './app/styles/index.style';
import {ENTRIES1} from './app/static/entries';


export default class example extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			modalY: new Animated.Value(0),
			opacity: new Animated.Value(1),
			data: ENTRIES1,
			activeItem: ENTRIES1[0],
		};
		this._itemChanged = this._itemChanged.bind(this);
		this._renderItem = this._renderItem.bind(this);
		this._eventClicked = this._eventClicked.bind(this);
		this._back = this._back.bind(this);
	}
	
	_eventClicked(data) {
		Animated.timing(this.state.opacity, {
			duration: 300,
			toValue: 0
		}).start();
		this.setState({active: data});
	}
	
	_renderItem({item, index}) {
		return <SliderEntry
			eventClicked={() => this._eventClicked(item)}
			data={item}
			reset={!this.state.active}
			even={(index + 1) % 2 === 0}/>;
	}
	
	_itemChanged(index) {
		const activeItem = this.state.data[index];
		this.setState({activeItem});
		Animated.timing(this.state.modalY, {
			duration: 300,
			toValue: index * -(45)
		}).start();
	}
	
	_back() {
		this.setState({active: false});
		Animated.timing(this.state.opacity, {
			duration: 300,
			toValue: 1
		}).start();
	}
	
	render() {
		const {data, active} = this.state;
		const entries = data.map((e, key) => {
			return (
				<Animated.View key={key} style={[
					{
						transform: [{
							translateY: this.state.modalY
						}]
					}
				]}>
					<View style={{display: 'flex', flexDirection: 'row'}}>
						<View style={{flex: 1, paddingLeft: 20}}>
							<Text numberOfLines={1} style={styles.title}>{e.title}</Text>
							<Text numberOfLines={1} style={styles.subtitle}>{e.location}</Text>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end', paddingRight: 20}}>
							<Text numberOfLines={1} style={styles.subtitle}>{e.date}</Text>
						</View>
					</View>
				</Animated.View>
			)
		});
		return (
			<SafeAreaView style={styles.safeArea}>
				{active ? <TouchableOpacity style={{
					position: 'absolute',
					left: 10,
					top: 20,
					zIndex: 2,
					
				}} onPress={this._back}>
					<Text style={{
						fontSize: 20,
						color: '#fff',
					}}> Events </Text>
				</TouchableOpacity> : null
				}
				<Animated.View style={[
					{
						height: 45,
						overflow: 'hidden',
						opacity: this.state.opacity
					}
				]}>
					{entries}
				</Animated.View>
				<Carousel
					data={this.state.data}
					renderItem={this._renderItem}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					containerCustomStyle={styles.slider}
					layout={'stack'}
					loop={false}
					enableSnap={!active}
					scrollEnabled={!active}
					onSnapToItem={this._itemChanged}
				/>
				{active ? <EventDetails reset={!active} data={active}/> : null}
			</SafeAreaView>
		);
	}
}
