import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SettingsService } from './shared/services/services.module';
import { Settings } from './shared/models/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  settings: Settings;
  theme: string;

  constructor(
    private settingsService: SettingsService,
    public router: Router
  ) {
      this.settings = this.settingsService.settings;
  }
}
