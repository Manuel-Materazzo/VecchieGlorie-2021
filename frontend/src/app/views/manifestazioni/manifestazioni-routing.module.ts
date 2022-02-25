import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManifestazioniComponent } from './manifestazioni.component';

const routes: Routes = [
  {
    path: '',
    component: ManifestazioniComponent,
    data: {
      title: 'soci'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManifestazioniRoutingModule {}
