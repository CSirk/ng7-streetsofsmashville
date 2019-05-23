import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { NutritionTrackerAppModule } from './nutrition-tracker-app/nutrition-tracker-app.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MzButtonModule,
    MzSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
