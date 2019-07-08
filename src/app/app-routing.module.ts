import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      { path: '', redirectTo: '/okrs', pathMatch: 'full' },
      {
        path: 'okrs',
        loadChildren: () => import('./okrs/okrs.module').then(mod => mod.OkrsModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/okrs' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
