import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home-component';
import { NotFoundComponent } from './not-found/not-found-component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  //{ path: 'fitness', loadChildren: () => import('./fitness/fitness.module').then(mod => mod.FitnessModule), data: {preLoad: true}},
  { path: 'fitness', loadChildren: "./fitness/fitness.module#FitnessModule" },
  { path: 'movie-collection', loadChildren: "./movie-collection/movie-collection.module#MovieCollectionModule"},
  { path: '', redirectTo: '/home', pathMatch:'full'}, //if no path is given
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
