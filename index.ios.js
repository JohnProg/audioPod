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
import ManualAddFeed from './App/Screens/ManualAddFeed';
import LocalStorage from './App/Stores/LocalStorage';
import PlusButtonImage from 'image!NavBarButtonPlus';

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
          title: 'AudioPod',
          backButtonTitle: 'Back',
          rightButtonIcon: PlusButtonImage,
          onRightButtonPress: () => {
            this.refs.mainNav.navigator.push({
              component: ManualAddFeed,
              title: 'New Feed',
            });
          }
        }}
        tintColor="#FFFFFF"
        barTintColor="#E91E63"
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
