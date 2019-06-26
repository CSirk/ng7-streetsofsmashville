import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NutritionTrackerAppComponent } from './apps/nutrition-tracker-app/nutrition-tracker-app.component';
import { DownloadsComponent } from './downloads/downloads.component';

const routes: Routes = [
    { path: 'apps/nutrition-tracker-app', component: NutritionTrackerAppComponent },
    { path: 'downloads', component: DownloadsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class FitnessRoutingModule {}