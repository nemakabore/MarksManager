import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMarkPage } from './edit-mark.page';

const routes: Routes = [
  {
    path: '',
    component: EditMarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMarkPageRoutingModule {}
