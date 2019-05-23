import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';

import { FormsModule } from '@angular/forms';


import { NutritionTrackerAppRoutingModule } from './nutrition-tracker-app-routing.module';
import { NutritionTrackerAppComponent } from './nutrition-tracker-app.component';
import { SpinnerComponent } from '../spinner/spinner.component';


@NgModule({
  declarations: [
      NutritionTrackerAppComponent,
      SpinnerComponent
  ],
  imports: [
    CommonModule,
    NutritionTrackerAppRoutingModule,
    MzButtonModule,
    MzSelectModule,
    MzTabModule,
    MzInputModule,
    FormsModule
  ],
  providers: [],
})
export class NutritionTrackerAppModule { }
