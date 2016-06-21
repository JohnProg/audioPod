import dispatcher from '../../AppDispatcher';
import AppConstants from '../Constants/AppConstants';

module.exports = {
  addFeed(feed) {
    dispatcher.handleViewAction({
      actionType: AppConstants.ADD_FEED,
      data: feed,
    });
  },
  removeFeed(feed) {
    dispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_FEED,
      data: feed,
    });
  }
}
