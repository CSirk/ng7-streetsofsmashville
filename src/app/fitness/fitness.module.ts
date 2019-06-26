import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MzButtonModule, MzSelectModule, MzInputModule, MzTabModule, MzCardModule, MzProgressModule, MzIconModule, MzIconMdiModule, MzTooltipModule } from 'ngx-materialize';


import { FitnessRoutingModule } from './fitness-routing.module';
import { NutritionTrackerAppComponent } from './apps/nutrition-tracker-app/nutrition-tracker-app.component';
import { DownloadsComponent} from './downloads/downloads.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';

import { NutritionTrackerAppService } from './apps/nutrition-tracker-app/nutrition-tracker-app.service';

@NgModule({
  declarations: [
      NutritionTrackerAppComponent,
      DownloadsComponent,
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
    MzTooltipModule,
    FormsModule,
  ],
  providers: [ NutritionTrackerAppService],
})
export class FitnessModule { }
