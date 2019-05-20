import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { HackerNewsAPIService } from '../../shared/services/hackernews-api.service';
import { UtilService } from '../../shared/services/util.service';
import { Story } from '../../shared/models/story';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  typeSub: Subscription;
  pageSub: Subscription;
  items: Story[];
  feedType: string;
  pageNum: number;
  listStart: number;
  errorMessage = '';

  constructor(
    private hackerNewsAPIService: HackerNewsAPIService,
    private utilService: UtilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.typeSub = this.route
      .data
      .subscribe(data => {
        this.feedType = (data as any).feedType;
      });

    this.pageSub = this.route.params.subscribe(params => {
      // For page params
      if (params.page) {
        this.pageNum = params.page ? +params.page : 1;
        this.hackerNewsAPIService.fetchFeed(this.feedType, this.pageNum)
        .subscribe(
          items => {
            let updatedItems: any = [];
            if (localStorage.getItem('feedLocalProperties')) {
              updatedItems = this.utilService.getUpdatedFeeds(items as any);
            }
            this.items = updatedItems.length > 0 ? updatedItems as Story[] : items as Story[];
          },
          error => this.errorMessage = 'Could not load ' + this.feedType + ' stories.',
          () => {
            this.listStart = ((this.pageNum - 1) * 10) + 1;
            window.scrollTo(0, 0);
          }
        );
      }
    });
  }

  updateFeeds(feed: Story) {
     this.items = this.items.filter(item => item.id !== feed.id);
  }
}
