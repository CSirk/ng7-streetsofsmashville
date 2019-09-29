import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MzButtonModule, MzSelectModule, MzInputModule, MzTabModule, MzCardModule, MzProgressModule, MzIconModule, MzIconMdiModule, MzTooltipModule, MzParallaxModule } from 'ngx-materialize';

import { SpinnerModule } from '../common/spinner/spinner.module';
import { MovieCollectionRoutingModule } from './movie-collection-routing.module';
import { MovieCollectionAppComponent } from './movie-collection-app.component';
//import { SpinnerComponent } from '../common/spinner/spinner.component';

import { MovieCollectionAppService } from './movie-collection-app.service';

@NgModule({
  declarations: [
      MovieCollectionAppComponent,
      //SpinnerComponent
  ],
  imports: [
    CommonModule,
    MovieCollectionRoutingModule,
    MzButtonModule,
    MzSelectModule,
    MzTabModule,
    MzInputModule,
    MzCardModule,
    MzProgressModule,
    MzIconMdiModule,
    MzIconModule,
    MzTooltipModule,
    MzParallaxModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [ MovieCollectionAppService],
})
export class MovieCollectionModule { }
