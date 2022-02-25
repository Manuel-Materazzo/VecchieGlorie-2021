import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import {AuthGuard} from "./services/auth-guard.service";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'soci',
        loadChildren: () => import('./views/soci/soci.module').then(m => m.SociModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'visitatori',
        loadChildren: () => import('./views/soci/soci.module').then(m => m.SociModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sociNew',
        loadChildren: () => import('./views/soci/soci.module').then(m => m.SociModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'visitatoriNew',
        loadChildren: () => import('./views/soci/soci.module').then(m => m.SociModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'garage',
        loadChildren: () => import('./views/garage/garage.module').then(m => m.GarageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'garageNew',
        loadChildren: () => import('./views/garage/garage.module').then(m => m.GarageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tessere',
        loadChildren: () => import('./views/tessere/tessere.module').then(m => m.TessereModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tessereNew',
        loadChildren: () => import('./views/tessere/tessere.module').then(m => m.TessereModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manifestazioni',
        loadChildren: () => import('./views/manifestazioni/manifestazioni.module').then(m => m.ManifestazioniModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manifestazioniNew',
        loadChildren: () => import('./views/manifestazioni/manifestazioni.module').then(m => m.ManifestazioniModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'partecipanti',
        loadChildren: () => import('./views/partecipanti/partecipanti.module').then(m => m.PartecipantiModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'partecipantiNew',
        loadChildren: () => import('./views/partecipanti/partecipanti.module').then(m => m.PartecipantiModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
