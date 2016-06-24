'use strict';

import FluxUtil from 'flux-util';
import dispatcher from '../../AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import AudioStore from './AudioStore';
import RNFS from 'react-native-fs';

const createStore = FluxUtil.createStore;

import {
  AlertIOS,
} from 'react-native';

var store = createStore({
  bootstrap(complete) {
		RNFS.readDir(RNFS.DocumentDirectoryPath + '/')
		  .then((result) => {
        AudioStore.setState({'podcasts': result.map( (i) => {return i.name} )});
        if (complete) {complete();}
		  })
  },
})

module.exports = store;