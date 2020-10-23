import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestDetaljiPageRoutingModule } from './dest-detalji-routing.module';

import { DestDetaljiPage } from './dest-detalji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestDetaljiPageRoutingModule
  ],
  declarations: [DestDetaljiPage]
})
export class DestDetaljiPageModule {}
