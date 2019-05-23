import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'nutrition-tracker-app'},
  { path: 'nutrition-tracker-app', loadChildren: './nutrition-tracker-app/nutrition-tracker-app.module#NutritionTrackerAppModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
