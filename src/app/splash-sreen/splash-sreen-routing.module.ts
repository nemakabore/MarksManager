import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashSreenPage } from './splash-sreen.page';

const routes: Routes = [
  {
    path: '',
    component: SplashSreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashSreenPageRoutingModule {}
