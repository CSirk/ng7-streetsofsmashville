import { Component } from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { NutritionRecord } from './models/nutrition-record';
import { Nutrient } from './models/nutrient';
import { Apple, Orange } from './data/nutrient-data';
//import { NUTRIENTS } from './data/nutrient-data';

@Component({
  templateUrl: './nutrition-tracker-app.component.html',
})
export class NutritionTrackerAppComponent {
  public showThrobber: boolean;
  public userLoaded: boolean;
  public nutrients: Nutrient[] = new Array();
  public userSavedRecords: NutritionRecord[] = new Array();
  public currentRecord: NutritionRecord = new NutritionRecord();

  public retrieveNutritionRecordsForUser() : void {
    this.showThrobber = true;
    this.userLoaded = true;

    this.userSavedRecords.push(
      Apple,
      Orange
      )

    //this.nutrients = NUTRIENTS;
    console.log(this.currentRecord)
    }

  public selectNutritionRecord(record: NutritionRecord) {
    console.log(record)
    this.currentRecord = record;
    console.log(this.currentRecord)
  }

  public userSavedRecordSelectChange (event: any) {
    //update the ui
    let pos = this.userSavedRecords.map(function(e) { return e.RecordName; }).indexOf(event.target.value);
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
  }
}
