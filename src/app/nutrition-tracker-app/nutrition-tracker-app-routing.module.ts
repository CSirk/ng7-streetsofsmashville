import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NutritionTrackerAppComponent } from './nutrition-tracker-app.component';

const routes: Routes = [
    { path: '', component: NutritionTrackerAppComponent },
    { path: 'nutrition-tracker-app', component: NutritionTrackerAppComponent }
]
@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class NutritionTrackerAppRoutingModule {}