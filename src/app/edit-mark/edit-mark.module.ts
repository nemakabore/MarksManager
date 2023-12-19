import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMarkPageRoutingModule } from './edit-mark-routing.module';

import { EditMarkPage } from './edit-mark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMarkPageRoutingModule
  ],
  declarations: [EditMarkPage]
})
export class EditMarkPageModule {}
