import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routing } from './app.routes';

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }
