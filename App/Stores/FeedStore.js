'use strict';

import FluxUtil from 'flux-util';
import dispatcher from '../../AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import _ from 'lodash';

const createStore = FluxUtil.createStore;

const _feeds = [];

var store = createStore({

  setState(feeds) {
    _feeds = (feeds && feeds.slice()) || [];
  },

  getState() {
    return _feeds.slice();
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.ADD_FEED:
        _feeds.push(_.omit(action.data, 'entries'));
        store.emitChange(action);
        break;
      case AppConstants.REMOVE_FEED:
        _feeds.splice(_feeds.indexOf(action.data), 1);
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
