import { Component } from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzTabModule } from 'ngx-materialize';
import { NutritionRecord } from './models/nutrition-record';
import { Nutrient } from './models/nutrient';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';
import { NutritionProgressAggregate } from './models/nutrition-progress-aggregate';
import { NutritionGoal } from './models/nutrition-goal';

@Component({
  templateUrl: './nutrition-tracker-app.component.html',
})
export class NutritionTrackerAppComponent {
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;
  public userSavedRecords: NutritionRecord[] = new Array();
  public globalSavedRecords: NutritionRecord[] = new Array();
  public goalRecord: NutritionGoal = new NutritionGoal();
  public currentRecord: NutritionRecord = new NutritionRecord();
  public userNutritionRecordAggregate: NutritionRecordAggregate = new NutritionRecordAggregate();
  public userNutritionProgressAggregate: NutritionProgressAggregate = new NutritionProgressAggregate();

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) {
    this.userNutritionProgressAggregate.NutritionGoal = new NutritionGoal();
  }

  public userSavedRecordSelectChange (event: any) {
    let pos = this.userSavedRecords.map(function(e) { return e.RecordName; }).indexOf(event.target.value);
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
  }

  public preventDefAndProp(event: Event) : void {
    event.stopPropagation();
    event.preventDefault();
  }

  public deloadUser() : void {
    this.userLoaded = false;
  }

  public retriveNutritionDataForUser() : void {
    this.showThrobber = true;
    this.NutritionTrackerAppService.getNutritionRecordsByUserId(this.currentUser).then((data) => {
      this.userNutritionRecordAggregate = data;

      if(data.SavedUserNutritionRecords) {
        for(var i = 0; i < data.SavedUserNutritionRecords.length; i++) {
          this.userSavedRecords.push(data.SavedUserNutritionRecords[i])
        }
      }

      if(data.SavedGlobalNutritionRecords) {
        for(var i = 0; i < data.SavedGlobalNutritionRecords.length; i++) {
          this.globalSavedRecords.push(data.SavedGlobalNutritionRecords[i])
        }
      }
      this.currentRecord = this.userNutritionRecordAggregate.BaseNutritionRecord;
    })
    .then(() => {
      this.NutritionTrackerAppService.getNutritionProgressByUserId(this.currentUser)
      .then((data) => {
          this.userNutritionProgressAggregate = data;
          this.goalRecord = this.userNutritionProgressAggregate.NutritionGoal;
          this.userLoaded = true;
          this.showThrobber = false;
        })
    })
  };

  public addNutritionRecord(saveUserRecord: boolean) : void {
    this.showThrobber = true;
    this.currentRecord.RecordType = (saveUserRecord == true) ? "UserSaved" : "UserDaily";
    this.NutritionTrackerAppService.addNutritionRecord(this.currentRecord)
    .then(() => {
      this.retriveNutritionDataForUser()
    })
  }
}
