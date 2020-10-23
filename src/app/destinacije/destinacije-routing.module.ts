import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinacijePage } from './destinacije.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DestinacijePage,
    children: [
      {
        path: 'kolekcija',
        loadChildren: () => import('./kolekcija/kolekcija.module').then(m => m.KolekcijaPageModule)
      },
      {
        path: 'sacuvano',
        loadChildren: () => import('./sacuvano/sacuvano.module').then(m => m.SacuvanoPageModule)
      },
      {
        path: 'moj-profil',
        loadChildren: () => import('./moj-profil/moj-profil.module').then( m => m.MojProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/destinacije/tabs/kolekcija',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/destinacije/tabs/kolekcija',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinacijePageRoutingModule {}
