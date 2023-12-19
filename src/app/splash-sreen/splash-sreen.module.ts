import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashSreenPageRoutingModule } from './splash-sreen-routing.module';

import { SplashSreenPage } from './splash-sreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashSreenPageRoutingModule
  ],
  declarations: [SplashSreenPage]
})
export class SplashSreenPageModule {}
