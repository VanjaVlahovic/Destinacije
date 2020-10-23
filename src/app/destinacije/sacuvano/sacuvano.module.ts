import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacuvanoPageRoutingModule } from './sacuvano-routing.module';

import { SacuvanoPage } from './sacuvano.page';
import {RatingComponent} from '../rating/rating.component';
import {SavedElementComponent} from '../saved-element/saved-element.component';
import {FilterModalComponent} from '../filter-modal/filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacuvanoPageRoutingModule
  ],
  declarations: [SacuvanoPage, RatingComponent, SavedElementComponent, FilterModalComponent]
})
export class SacuvanoPageModule {}
