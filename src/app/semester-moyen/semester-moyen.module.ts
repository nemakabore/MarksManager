import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemesterMoyenPageRoutingModule } from './semester-moyen-routing.module';

import { SemesterMoyenPage } from './semester-moyen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemesterMoyenPageRoutingModule
  ],
  declarations: [SemesterMoyenPage]
})
export class SemesterMoyenPageModule {}
