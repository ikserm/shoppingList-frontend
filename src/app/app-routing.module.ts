import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { ArticlesComponent } from "./components/articles/articles.component";

import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  { path:"home",  component: HomeComponent},
  { path:"articles",  component: ArticlesComponent,canActivate: [OktaAuthGuard]},
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: '**', pathMatch: 'full',  redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
