import { Component } from '@angular/core';
import { NutritionRecord } from './models/nutrition-record';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';
import { NutrientProgressRecord } from './models/nutrient-progress-record';

@Component({
  templateUrl: './nutrition-tracker-app.component.html',
})
export class NutritionTrackerAppComponent {
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;
  public userSavedRecords: NutritionRecord[] = new Array();
  public globalSavedRecords: NutritionRecord[] = new Array();
  public currentRecord: NutritionRecord = new NutritionRecord();
  public userNutritionRecordAggregate: NutritionRecordAggregate = new NutritionRecordAggregate();
  public nutrientProgressRecords: NutrientProgressRecord[] = new Array();

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) {}

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
      this.NutritionTrackerAppService.getNutrientProgressByUserId(this.currentUser)
      .then((data) => {
        this.nutrientProgressRecords = data;
        this.userLoaded = true;
        this.showThrobber = false;
      })
    })
  };

  public addNutritionRecord(saveUserRecord: boolean) : void {
    this.showThrobber = true;
    this.currentRecord.UserId = this.currentUser;
    this.currentRecord.RecordType = (saveUserRecord == true) ? "UserSaved" : "UserDaily";

    this.NutritionTrackerAppService.addNutritionRecord(this.currentRecord)
    .then(() => {
      this.retriveNutritionDataForUser()
    })
  };

  public deleteNutritionRecord(nutritionRecord: NutritionRecord) {
    this.NutritionTrackerAppService.deleteNutritionRecord(nutritionRecord)
    .then(() => {
      this.retriveNutritionDataForUser();
    });
  }
}