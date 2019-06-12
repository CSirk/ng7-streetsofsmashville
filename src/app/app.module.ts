import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { FitnessModule } from './fitness/fitness.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home-component';
import { NotFoundComponent } from './not-found/not-found-component';
import { HeaderComponent } from './common/header/header.component';

import { MzNavbarModule } from 'ngx-materialize';
import { MzSidenavModule } from 'ngx-materialize';
import { MzCollapsibleModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MzButtonModule,
    MzSelectModule,
    HttpClientModule,
    FitnessModule,
    MzNavbarModule,
    MzSidenavModule,
    MzCollapsibleModule,
    MzIconModule, 
    MzIconMdiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
