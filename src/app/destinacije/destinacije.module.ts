import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinacijePageRoutingModule } from './destinacije-routing.module';

import { DestinacijePage } from './destinacije.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinacijePageRoutingModule
  ],
  declarations: [DestinacijePage]
})
export class DestinacijePageModule {}
