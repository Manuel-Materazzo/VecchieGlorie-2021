import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SociComponent } from './soci.component';

const routes: Routes = [
  {
    path: '',
    component: SociComponent,
    data: {
      title: 'soci'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SociRoutingModule {}
