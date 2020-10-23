import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KolekcijaPageRoutingModule } from './kolekcija-routing.module';

import { KolekcijaPage } from './kolekcija.page';
import {DestElementComponent} from '../dest-element/dest-element.component';
import {DestModalComponent} from '../dest-modal/dest-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KolekcijaPageRoutingModule
  ],
  declarations: [KolekcijaPage, DestElementComponent, DestModalComponent],
  entryComponents: [DestModalComponent]
})
export class KolekcijaPageModule {}
