import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { ArticlesComponent } from "./components/articles/articles.component";

const routes: Routes = [
  { path:"home",  component: HomeComponent},
  { path:"articles",  component: ArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
