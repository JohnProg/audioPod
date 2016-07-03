'use strict';

import React, { Component } from 'react';
import Api from '../Api/RssFeedApi';
import AppActions from '../Actions/AppActions';
import FeedStore from '../Stores/FeedStore';
import _ from 'lodash';

import {
  AlertIOS,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

const STORAGE_KEY = '@FeedList';

class NewFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isLoading: false
    }
  }

  _addFeed() {
    Api.fetchRss(this.state.input).then((res) => {
      if (res.responseStatus == 200) {
        var feeds = FeedStore.getState();
        var resFeed = res.responseData.feed;
        if(_.find(feeds, _.matchesProperty('feedUrl', resFeed.feedUrl))){
          this.props.navigator.pop();
          AlertIOS.alert('Feeds already in list');
        } else {
          this.props.navigator.pop();
          AppActions.addFeed(res.responseData.feed);
        }
      } else {
        AlertIOS.alert(res.responseDetails);
      }
    });
  }

  render() {
    return (
     <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({input: text})}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this._addFeed.bind(this)}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80,
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    padding: 5,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#183E63',
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = NewFeed;