import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Story } from '../../shared/models/story';

import { SettingsService } from '../../shared/services/services.module';
import { HackerNewsAPIService } from '../../shared/services/hackernews-api.service';
import { Settings } from '../../shared/models/settings';

@Component({
  selector: 'app-item-block',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Story;
  @Output() valueChange = new EventEmitter();
  settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private hackerNewsAPIService: HackerNewsAPIService,
  ) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
  }

  handleAction(action: string, item: Story) {
    this.hackerNewsAPIService.handleAction(action, item)
      .subscribe(
        feed => {
          this.item = feed;

          // Emit to parent to hide this feed
          if (action === 'hide') {
            this.valueChange.emit(feed);
          }
        }
      );
  }

  get hasUrl(): boolean {
    return this.item.url && this.item.url.indexOf('http') === 0;
  }

}
