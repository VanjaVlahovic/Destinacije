import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MojProfilPage } from './moj-profil.page';

const routes: Routes = [
  {
    path: '',
    component: MojProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MojProfilPageRoutingModule {}
