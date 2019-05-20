import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/services.module';
import { Settings } from '../../shared/models/settings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
