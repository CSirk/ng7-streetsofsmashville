import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzProgressModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';


import { FitnessRoutingModule } from './fitness-routing.module';
import { NutritionTrackerAppComponent } from './apps/nutrition-tracker-app/nutrition-tracker-app.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';

import { NutritionTrackerAppService } from './apps/nutrition-tracker-app/nutrition-tracker-app.service';

@NgModule({
  declarations: [
      NutritionTrackerAppComponent,
      SpinnerComponent
  ],
  imports: [
    CommonModule,
    FitnessRoutingModule,
    MzButtonModule,
    MzSelectModule,
    MzTabModule,
    MzInputModule,
    MzCardModule,
    MzProgressModule,
    MzIconMdiModule,
    MzIconModule,
    FormsModule
  ],
  providers: [ NutritionTrackerAppService],
})
export class FitnessModule { }
