'use strict';

import React from 'react';

import {
  AlertIOS,
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import HomeScreen from './App/Screens/HomeScreen';
import NewFeed from './App/Screens/NewFeed';
import LocalStorage from './App/Stores/LocalStorage';

class audioPod extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bootstrapped: false
    }
  }

 componentWillMount() {
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  }

  render() {
    if (this.state.bootstrapped == false) {
      return <View />;
    }
    return (
      <NavigatorIOS
        ref="mainNav"
        style={styles.container}
        initialRoute={{
          component: HomeScreen,
          title: 'RSS Feeds',
          backButtonTitle: 'Back',
          //rightButtonIcon: require('image!NavBarButtonPlus'),
          onRightButtonPress: () => {
            this.refs.mainNav.navigator.push({
              component: NewFeed,
              title: 'New Feed',
            });
          }
        }}
        tintColor="#FFFFFF"
        barTintColor="#183E63"
        titleTextColor="#FFFFFF"/>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('audioPod', () => audioPod);
