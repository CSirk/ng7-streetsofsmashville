import { Component } from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { NutritionRecord } from './models/nutrition-record';
import { Nutrient } from './models/nutrient';
import { Apple, Orange } from './data/nutrient-data';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';

@Component({
  templateUrl: './nutrition-tracker-app.component.html',
})
export class NutritionTrackerAppComponent {
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;
  public nutrients: Nutrient[] = new Array();
  public userSavedRecords: NutritionRecord[] = new Array();
  public currentRecord: NutritionRecord = new NutritionRecord();
  public userNutritionRecordAggregate: NutritionRecordAggregate;

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) {}

  public userSavedRecordSelectChange (event: any) {
    let pos = this.userSavedRecords.map(function(e) { return e.RecordName; }).indexOf(event.target.value);
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
  }

  public deloadUser(event: any) : void {
    console.log('hit it')
    this.userLoaded = false;
  }

  public retrieveNutritionRecordsForUser() : void {
    this.showThrobber = true;

    this.NutritionTrackerAppService.getAllContractsAndPackagesAggregate(this.currentUser).then((data) => {
      this.userNutritionRecordAggregate = data;
      this.userLoaded = true;
      this.showThrobber = false;
    })

    this.userSavedRecords.push(
      Apple,
      Orange
      )
    }
}
