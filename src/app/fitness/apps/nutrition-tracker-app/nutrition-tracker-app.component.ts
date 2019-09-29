import { Component } from '@angular/core';
import { NutritionRecord } from './models/nutrition-record';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';
import { NutrientProgressRecord } from './models/nutrient-progress-record';
import { Nutrient } from './models/nutrient';

@Component({
  templateUrl: './nutrition-tracker-app.component.html'
})
export class NutritionTrackerAppComponent {
  public appName = "Nutrition Tracker App"
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
    let pos = this.userSavedRecords.map(function(e) { console.log(e); return e.RecordName; }).indexOf(event.target.value);
    console.log(event)
    console.log(pos)
    console.log(this.userSavedRecords[pos])
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
  }

  public convertPercentToNumber(event: any, nutrient: Nutrient) : void {
    console.log('here')
    console.log(event)
    let charCode = String.fromCharCode(event.which).toLowerCase();
    console.log(charCode)
    if (event.shiftKey && charCode === '5') {
      console.log('yep')
      //Stop % from showing in textbox
      event.preventDefault();
      
      let record = new NutrientProgressRecord();
      let modifiedName = nutrient.Name.replace(' ', '');

      for(let i = 0; i < this.nutrientProgressRecords.length; i++) {
        if(this.nutrientProgressRecords[i].NutrientName == modifiedName) {
          record = this.nutrientProgressRecords[i];
        }
      }
      nutrient.Amount = (nutrient.Amount * (record.NutrientGoalAmount * .01));
    }
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
      console.log(data)
      if(data.SavedUserNutritionRecords) {
        this.userSavedRecords = [];
        for(var i = 0; i < data.SavedUserNutritionRecords.length; i++) {
          this.userSavedRecords.push(data.SavedUserNutritionRecords[i])
        }
      }

      if(data.SavedGlobalNutritionRecords) {
        this.globalSavedRecords = [];
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