import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KolekcijaPage } from './kolekcija.page';

const routes: Routes = [
  {
    path: '',
    component: KolekcijaPage
  },
  {
    path: ':id',
    loadChildren: () => import('./dest-detalji/dest-detalji.module').then( m => m.DestDetaljiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KolekcijaPageRoutingModule {}
