import { Injectable } from '@angular/core';

import { Settings } from '../models/settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    showSettings : false,
    openLinkInNewTab: false,
    theme: 'default',
    titleFontSize: '15',
    listSpacing: '0',
  };

  constructor() { }
}
