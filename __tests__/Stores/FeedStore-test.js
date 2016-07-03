const ROOT = '../../App/'
jest.dontMock(ROOT + 'Stores/FeedStore');

describe('FeedStore', function() {
	var AppConstants = require((ROOT + 'Constants/AppConstants'));

	var addFeed = {
		source: 'VIEW_ACTION',
		action: {
			actionType: AppConstants.ADD_FEED,
			text: 'foo'
		}
	};

});

var AppDispatcher;
var FeedStore;
var callback;

beforeEach(function() {
	AppDispatcher = require('../../AppDispatcher');
	FeedStore = require(ROOT + 'Stores/FeedStore');
	callback = AppDispatcher.register.mock.calls[0][0];
});

it('registers a callback with the dispatcher', function() {
	expect(AppDispatcher.register.mock.calls.length).toBe(1);
});