'use strict';

import FluxUtil from 'flux-util';
import dispatcher from '../../AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import AppActions from '../Actions/AppActions';
import AudioPlayer from 'react-native-audioplayer';
import RNFS from 'react-native-fs';
import _ from 'lodash';

const createStore = FluxUtil.createStore;
const _progress = 0;
const _podcasts = [];
const _downloading = false;

var store = createStore({

  setState({progress, podcasts, downloading}) {
		_podcasts = podcasts || [];
	  _progress = progress || 0;
	  _downloading = downloading || false;
  },

  getState() {
		return {
			podcasts: _podcasts,
	  	progress: _progress,
	  	downloading: _downloading,
  	}
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {

      case AppConstants.PLAY_MP3:
      	AudioPlayer.play(RNFS.DocumentDirectoryPath + '/' + action.data.fileName + '.mp3')
        store.emitChange(action);
        break;

      case AppConstants.PODCAST_DOWNLOADED:
      	_downloading = false;
        store.emitChange(action);
        break;

      case AppConstants.DOWNLOAD_MP3:
      	_downloading = true;

				var downloadProgress = (response) => {
				  _progress = Math.floor((response.bytesWritten/response.contentLength) * 100);
					if (_progress === 100) {
						AppActions.podcastDownloaded(action);
					} else {
					  store.emitChange(action);
					}
				};

				RNFS.downloadFile({
				  fromUrl: action.data.mp3Path,
				  toFile: RNFS.DocumentDirectoryPath + '/' + action.data.fileName + '.mp3',
				  progressDivider: 5,
				  progress: downloadProgress
			  })

        break;
    }

    return true;
  })
})

module.exports = store;