import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestDetaljiPage } from './dest-detalji.page';

const routes: Routes = [
  {
    path: '',
    component: DestDetaljiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestDetaljiPageRoutingModule {}
