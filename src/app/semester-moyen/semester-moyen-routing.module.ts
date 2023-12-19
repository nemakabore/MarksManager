import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemesterMoyenPage } from './semester-moyen.page';

const routes: Routes = [
  {
    path: '',
    component: SemesterMoyenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemesterMoyenPageRoutingModule {}
