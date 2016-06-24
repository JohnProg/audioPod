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
  },
  playPodcast(fileName) {
  	dispatcher.handleViewAction({
  		actionType: AppConstants.PLAY_MP3,
  		data: fileName,
  	})
  },
  downloadMP3({mp3Path, fileName}) {
  	dispatcher.handleViewAction({
  		actionType: AppConstants.DOWNLOAD_MP3,
  		data: {
  			mp3Path: mp3Path,
  			fileName: fileName
  		},
  	})
  },
  podcastDownloaded({mp3Path, fileName}) {
  	dispatcher.handleViewAction({
  		actionType: AppConstants.PODCAST_DOWNLOADED,
  		data: {
  			mp3Path: mp3Path,
  			fileName: fileName
  		},
  	})
  }
}
