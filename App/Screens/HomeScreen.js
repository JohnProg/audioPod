'use strict';

import React, { Component } from 'react';
import Api from '../Api/RssFeedApi';
import AppActions from '../Actions/AppActions';
import FeedStore from '../Stores/FeedStore';
import FeedDetail from './FeedDetail';
import _ from 'lodash';

import {
  ActivityIndicatorIOS,
  ActionSheetIOS,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const BUTTONS = [
  'Remove Feed',
  'Back',
];

const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      loading: true,
    }
  }

  componentWillMount() {
    FeedStore.addChangeListener(this._updateFeedsFromStore.bind(this));
    this._updateFeedsFromStore();
  }

  componentWillUnmount() {
    FeedStore.removeChangeListener(this._updateFeedsFromStore.bind(this));
  }

  _updateFeedsFromStore() {
    this.setState({feeds: FeedStore.getState()});
  }

  _showFeedActionSheet(feed) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    },
    (buttonIndex) => {
      switch(buttonIndex) {
        case 0:
          AppActions.removeFeed(feed);
          this.props.navigator.pop();
          break;
      }
    });
  }

  _showFeedDetails(feed:any) {
    Api.fetchRss(feed.feedUrl)
    .then((res) => {
      if(res.responseStatus == 200) {
        var entries = res.responseData.feed.entries;
          this.props.navigator.push ({
            component: FeedDetail,
            title: feed.title,
            rightButtonIcon: require('image!NavBarButtonSettings'),
            onRightButtonPress: () => {this._showFeedActionSheet(feed)},
            passProps: {
              entries: entries
            }
          })
        } else {
        AlertIOS.alert(res.responseDetails);
      }
    });
  }

  _renderFeed(feed:any) {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,.1)"
        onPress={() => { this._showFeedDetails(feed) }}
        key={feed.length}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{feed.title}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.description}>{feed.description}</Text>
            <Text style={styles.smallText}>{feed.feedUrl}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.state.feeds.map((feed) => { return this._renderFeed(feed) })}
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FCE4EC'
  },
  wrapper: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  title: {
    paddingTop: 2,
    paddingBottom: 3,
    paddingRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: "#B4AEAE",
    fontSize: 12,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 11,
    textAlign: 'right',
    color: "#B4AEAE",
  }
});

module.exports = HomeScreen;
