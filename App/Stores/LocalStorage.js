'use strict';

import FluxUtil from 'flux-util';
import dispatcher from '../../AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import FeedStore from './FeedStore';

const createStore = FluxUtil.createStore;

import {
  AsyncStorage,
  AlertIOS,
} from 'react-native';

const KEY = '@FeedList';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(KEY, (error, feeds) => {
      if (error) {
        console.log('Error getting profile from local storage! ' + error.message);
        AlertIOS.alert('error');
        complete();
      } else {
        FeedStore.setState(JSON.parse(feeds));
        complete();
      }
    })
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.ADD_FEED:
      case AppConstants.REMOVE_FEED:
        var feeds = FeedStore.getState();
        AsyncStorage.setItem(KEY, JSON.stringify(feeds), (error) => {
          store.emitChange(action);
        });
        break;
    }

    return true;
  })
})

module.exports = store;
