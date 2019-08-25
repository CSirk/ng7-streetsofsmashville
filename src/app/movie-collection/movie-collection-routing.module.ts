import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MovieCollectionAppComponent } from './movie-collection-app.component';

const routes: Routes = [
    { path: 'movie-collection-app', component: MovieCollectionAppComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class MovieCollectionRoutingModule {}