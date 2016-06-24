'use strict';

import React, { Component } from 'react';
import EntryDetail from './EntryDetail';
import AppActions from '../Actions/AppActions';
import AudioStore from '../Stores/AudioStore';
import Button from 'react-native-button';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class FeedDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      podcasts: [],
      downloading: false,
    }
  }

  componentWillMount() {
    AudioStore.addChangeListener(this._updateLoadingProgressFromStore.bind(this));
    this._updateLoadingProgressFromStore();
  }

  componentWillUnmount() {
    AudioStore.removeChangeListener(this._updateLoadingProgressFromStore.bind(this));
  }

  _updateLoadingProgressFromStore() {
    this.setState(AudioStore.getState());
  }

  _showEntryDetails(entry:any) {
    this.props.navigator.push({
      component: EntryDetail,
      title: entry.title,
      passProps: {
        entry: entry
      }
    })
  }

	_downloadPodcast(entry:any) {
    AppActions.downloadMP3({
    	mp3Path: entry.mediaGroups[0].contents[0].url,
    	fileName: entry.title
    });
  }

  _playPodcast(entry:any) {
		AppActions.playPodcast({
    	fileName: entry.title
    });
  }

  _renderEntries(entry:any, id) {
  	let text;

  	if (this.state.downloading) {
	  	text = 'Downloading...'
	  } else {
		  text = 'Download'
	  }

  	var playable = <Button
  		containerStyle={styles.buttonContainer}
    	style={styles.buttonText}
    	onPress={() => { this._downloadPodcast(entry) }}>
    	{text}
    </Button>;

  	this.state.podcasts.map( (storedTitle) => { if (storedTitle === (entry.title + '.mp3')) {
  		playable = <Button containerStyle={styles.buttonContainer}
    style={styles.buttonText} onPress={() => { this._playPodcast(entry) }}>Play</Button>;
  	}})

  	var downloading = <Text />
  	if (this.state.downloading)
      downloading = <Text style={styles.description}>{this.state.progress}</Text>

    return (
      <TouchableHighlight
	      key={id}
        underlayColor="rgba(0,0,0,.1)"
        onPress={() => { this._showEntryDetails(entry) }}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.description}>{new Date(entry.publishedDate).toDateString()}</Text>
            {downloading}
            {playable}
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
    backgroundColor: '#FAFAFA'
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
  play: {
  	color: 'blue',
  },
  smallText: {
    fontSize: 11,
    textAlign: 'right',
    color: "#B4AEAE",
  },
	buttonContainer: {
		padding:10,
		height:45,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'white'
	},
	buttonText: {
		fontSize: 20,
		color: 'green'
	}
});

module.exports = FeedDetail;
