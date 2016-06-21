'use strict';

import React, { Component } from 'react';
import EntryDetail from './EntryDetail';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class FeedDetail extends Component {

  _showEntryDetails(entry:any) {
    this.props.navigator.push({
      component: EntryDetail,
      title: entry.title,
      passProps: {
        entry: entry
      }
    })
  }

  _renderEntries(entry:any, id) {
    return (
      <TouchableHighlight
	      key={id}
        underlayColor="rgba(0,0,0,.1)"
        onPress={() => { this._showEntryDetails(entry) }} >
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.description}>{new Date(entry.publishedDate).toDateString()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.props.entries.map((entry, i) => { return this._renderEntries(entry, i) })}
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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

module.exports = FeedDetail;
