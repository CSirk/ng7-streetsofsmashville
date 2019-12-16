import { Component } from '@angular/core';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { DomNutritionRecord } from './models/dom-nutrition-record';
import { UserNutritionInfo } from './models/user-nutrition-info';
import { DomNutrient } from './models/dom-nutrient';
import { DomNutritionGoal } from './models/dom-nutrition-goal';
import { DomUserFitnessProfile } from './models/dom-user-fitness-profile';
import { NutrientProgressRecord } from './models/nutrient-progess-record';

@Component({
  templateUrl: './nutrition-tracker-app.component.html'
})
export class NutritionTrackerAppComponent {
  public appName = "Nutrition Tracker App"
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;

  public userDailyRecords: DomNutritionRecord[] = new Array();
  public userSavedRecords: DomNutritionRecord[] = new Array();
  public globalSavedRecords: DomNutritionRecord[] = new Array();
  public currentRecord: DomNutritionRecord = new DomNutritionRecord();
  public baseNutrients: DomNutrient[] = new Array();
  public userNutritionGoal: DomNutritionGoal;
  public recommendedNutritionGoal: DomNutritionGoal;
  public userProfile: DomUserFitnessProfile;
  public nutrientProgressRecords: NutrientProgressRecord[] = new Array();

  public baseNutritionRecord: DomNutritionRecord;

  public initialBoxValue = "";
  public secondBoxValue = "";

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) {
    this.baseNutritionRecord = { Id: 0, Date: '', UserId: '', RecordType: '', RecordName: 'Untitled Record', NutrientRecordId: 0, Nutrients: new Array() }
  }

  public userSavedRecordSelectChange (event: any) {
    let pos = this.userSavedRecords.map(function(e) { console.log(e); return e.RecordName; }).indexOf(event.target.value);
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
  }

  public keyDownCaptureEvent(event: Event, nutrient: DomNutrient) {
    if(nutrient.Amount.toString().includes('%')) {
      nutrient.Amount = Number(nutrient.Amount.toString().replace('%', ''));
    }
    this.initialBoxValue = (event.target as HTMLTextAreaElement).value;
  }

  public inputActionEvent(event: Event, nutrient: DomNutrient) {
    let secondValue = (event.target as HTMLTextAreaElement).value;

    let difference = secondValue.split(this.initialBoxValue).join('');

    if(difference === '%') {
      nutrient.Amount = Number(nutrient.Amount.toString().replace('%', ''));
      event.preventDefault();
      this.convertPercentToNumber(nutrient)
    }
  }

  public convertPercentToNumber(nutrient: DomNutrient) : void {
    let recGoalNutrients = this.recommendedNutritionGoal.Nutrients;
      for(let i = 0; i < recGoalNutrients.length; i++) {
        if(recGoalNutrients[i].Name == nutrient.Name) {
          nutrient.Amount = (recGoalNutrients[i].Amount * (nutrient.Amount * .01));
        }
      }
    /*let charCode = String.fromCharCode(event.which).toLowerCase();
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
    */
  }
  
  public preventDefAndProp(event: Event) : void {
    event.stopPropagation();
    event.preventDefault();
  }

  public deloadUser() : void {
    this.userLoaded = false;
  }

  public retriveUserNutritionInfo() : void {
    this.showThrobber = true;

    this.NutritionTrackerAppService.getUserNutritionInfo(this.currentUser).then((data) => {

      this.globalSavedRecords = data.RecordCollection.GlobalSavedRecords;
      this.userDailyRecords = data.RecordCollection.UserDailyRecords;
      this.userSavedRecords = data.RecordCollection.UserSavedRecords;
      this.userNutritionGoal = data.UserDailyNutritionGoal;
      this.recommendedNutritionGoal = data.RecommendedNutritionGoal;
      this.userProfile = data.UserProfile;
      this.nutrientProgressRecords = data.NutrientProgressRecords;

      this.baseNutritionRecord.Nutrients = data.BaseNutrients;
      this.currentRecord = this.baseNutritionRecord;

      this.currentRecord.Nutrients.sort(function (nutrient1, nutrient2) {

        // Sort by display order, if first is lower move it up, higher down
        if (nutrient1.DisplayOrder < nutrient2.DisplayOrder) return -1;
        if (nutrient1.DisplayOrder > nutrient2.DisplayOrder) return 1;
      
        // Sort by name alphabetically, if first is alphabetically first move up, else down
        if (nutrient1.Name > nutrient2.Name) return 1;
        if (nutrient1.Name < nutrient2.Name) return -1;
      
      });

      this.userLoaded = true;
      this.showThrobber = false;

      console.log(this.nutrientProgressRecords)
    });
  };

  public addNutritionRecord(saveUserRecord: boolean) : void {
    this.showThrobber = true;
    this.currentRecord.UserId = this.currentUser;
    this.currentRecord.RecordType = (saveUserRecord == true) ? "UserSaved" : "UserDaily";

    this.NutritionTrackerAppService.addNutritionRecord(this.currentRecord)
    .then(() => {
      this.retriveUserNutritionInfo()
    })
  };

  public deleteNutritionRecord(nutritionRecord: DomNutritionRecord) {
    console.log(nutritionRecord)
    this.NutritionTrackerAppService.deleteNutritionRecord(nutritionRecord)
    .then(() => {
      this.retriveUserNutritionInfo();
    });
  }
}