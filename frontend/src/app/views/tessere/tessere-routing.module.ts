import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TessereComponent } from './tessere.component';

const routes: Routes = [
  {
    path: '',
    component: TessereComponent,
    data: {
      title: 'soci'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TessereRoutingModule {}
