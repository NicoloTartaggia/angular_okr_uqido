import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MetricsComponent } from './keys/key/metrics/metrics.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      { path: '', redirectTo: '/okrs', pathMatch: 'full' },
      {
        path: 'okrs',
        loadChildren: () => import('./okrs/okrs.module').then(mod => mod.OkrsModule)    // Angular 8 syntax
      }
    ]
  },
  { path: 'login', component: AuthComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: '**', redirectTo: '/okrs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
