import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feeds/feed/feed.component';

const feedRoutes = [{
  path: ':page',
  component: FeedComponent
}];

const routes: Routes = [
  {path: '', redirectTo: 'front_page/1', pathMatch: 'full'},
  {
    path: 'front_page',
    children: feedRoutes,
    data: {feedType: 'front_page'}
  },
  {
    path: 'story',
    children: feedRoutes,
    data: {feedType: 'story'}
  },
  {path: 'item', loadChildren: './item-details/item-details.module#ItemDetailsModule'}
];


// - Updated Export
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
