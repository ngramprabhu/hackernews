import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() {
  }

  getUpdatedFeeds(feeds: any[]): any[] {
      let updatedFeeds = feeds;
      // Get local properties
      const feedLocalProperties = JSON.parse(localStorage.getItem('feedLocalProperties'));
      const upVoteFeedIds = feedLocalProperties.filter(feed => feed.upVote === true).map(a => a.feedId);
      const hiddenFeedIds = feedLocalProperties.filter(feed => feed.hide === true).map(a => a.feedId);

      if (upVoteFeedIds.length > 0) {
          console.log(upVoteFeedIds);
          updatedFeeds = updatedFeeds.map(feed => {
            if (upVoteFeedIds.indexOf(feed.objectID) >= 0 || upVoteFeedIds.indexOf(feed.id) >= 0) {
                feed.points = feed.points + 1;
                feed.upVote = true;
            }
            return feed;
          });
      }

      if (hiddenFeedIds.length > 0) {
          // Filter Hidden feeds
          updatedFeeds = updatedFeeds.filter(feed => hiddenFeedIds.indexOf(feed.id) < 0);
      }
      return updatedFeeds;
  }
}
