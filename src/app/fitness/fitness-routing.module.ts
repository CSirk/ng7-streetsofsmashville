import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NutritionTrackerAppComponent } from './apps/nutrition-tracker-app/nutrition-tracker-app.component';

const routes: Routes = [
    { path: 'apps/nutrition-tracker-app', component: NutritionTrackerAppComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class FitnessRoutingModule {}