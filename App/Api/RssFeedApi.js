'use strict';

const Api = {
  fetchRss(url) {
    //if (!(/^http:\/\//.test(url))) {
      //url = "http://" + url;
    //}

    const GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1&q="
    var url = GOOGLE_FEED_API_URL + encodeURIComponent('http://feeds.thisamericanlife.org/talpodcast');

    return fetch(url).then((res) => res.json());
  }
};

module.exports = Api;
