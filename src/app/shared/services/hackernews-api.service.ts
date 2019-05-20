import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import fetch from 'unfetch';
import 'rxjs/add/operator/map';

import { Story } from '../models/story';

@Injectable()
export class HackerNewsAPIService {
  baseUrl: string;

  constructor() {
    this.baseUrl = 'https://hn.algolia.com/api/v1/';
  }

  fetchFeed(feedType: string, page: number): Observable<{}> {
    const apiParams = feedType === 'front_page' ? 'search' : 'search_by_date';
    return lazyFetch(`${this.baseUrl}${apiParams}?tags=${feedType}&page=${page}&hitsPerPage=10`);
  }

  fetchItemContent(id: number): Observable<Story> {
    return lazyFetch(`${this.baseUrl}/items/${id}`).map((story: Story) => {
      return story;
    });
  }

  handleAction(action: string, item: Story): Observable<Story> {
    let feedLocalProperties;
    const updatedStory: Story = item;
    const newFeedObject = {
        feedId: item.id,
        upVote: action === 'upVote' ? true : false,
        hide: action === 'hide' ? true : false
    };

    // Get Feed properties stored in Local Storage
    if (localStorage.getItem('feedLocalProperties')) {
      feedLocalProperties = JSON.parse(localStorage.getItem('feedLocalProperties'));
      if (feedLocalProperties.find(feed => feed.feedId === item.id)) {
        for (const feed of feedLocalProperties) {
          if (feed.feedId === item.id) {
            if (action === 'upVote') {
              feed.upVote = true;
            }
            if (action === 'hide') {
              feed.hide = true;
            }
            // Break to avoid looping further
            break;
          }
        }
      } else {
        feedLocalProperties.push(newFeedObject);
      }
    } else {
      feedLocalProperties = [newFeedObject];
    }

    // Update Story
    if (action === 'upVote') {
      updatedStory.upVote = true;
      updatedStory.points = updatedStory.points + 1;
    }

    if (action === 'hide') {
      updatedStory.hide = true;
    }

    // Store updates to local Storage
    localStorage.setItem('feedLocalProperties', JSON.stringify(feedLocalProperties));

    return new Observable(fetchObserver => {
        fetchObserver.next(updatedStory);
        fetchObserver.complete();
    });
  }
}

function lazyFetch(url, options?) {
  return new Observable(fetchObserver => {
    fetch(url, options)
      .then(res => {
        return res.json()
          .then(data => {
            fetchObserver.next(data.hits.map(mapResponse));
            fetchObserver.complete();
          });
      }).catch(err => fetchObserver.error(err));
  });
}

/**
 *  Map item specific response from JSON result
 */
function mapResponse(item) {
  // Map mismatching property from response
  item.id = item.objectID;
  item.time = item.created_at;
  item.timeAgo = item.created_at_i;
  item.domain = item.url ? getDomain(item.url) : '';
  item.commentsCount = item.num_comments;
  item.upVote = false;
  item.hide = false;
  return item;
}
/**
 *  Get Domain name from URL
 */
function getDomain(url) {
  const parsedUrl = new URL(url);
  const baseUrl = parsedUrl.origin;
  return baseUrl;
}
