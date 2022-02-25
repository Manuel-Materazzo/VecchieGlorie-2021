import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartecipantiComponent } from './partecipanti.component';

const routes: Routes = [
  {
    path: '',
    component: PartecipantiComponent,
    data: {
      title: 'soci'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartecipantiRoutingModule {}
