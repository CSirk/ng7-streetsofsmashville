import { Component } from '@angular/core';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { DomNutritionRecord } from './models/dom-nutrition-record';
import { UserNutritionInfo } from './models/user-nutrition-info';
import { DomNutrient } from './models/dom-nutrient';
import { DomNutritionGoal } from './models/dom-nutrition-goal';
import { DomUserFitnessProfile } from './models/dom-user-fitness-profile';
import { NutrientProgressRecord } from './models/nutrient-progess-record';
import { UserAwardInfo } from './models/user-award-info';

@Component({
  templateUrl: './nutrition-tracker-app.component.html'
})
export class NutritionTrackerAppComponent {
  public appName = "Nutrition Tracker App"
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;

  public userProgressRecords: DomNutritionRecord[] = new Array();
  public userSavedRecords: DomNutritionRecord[] = new Array();
  public globalSavedRecords: DomNutritionRecord[] = new Array();
  public currentRecord: DomNutritionRecord = new DomNutritionRecord();
  public baseNutrients: DomNutrient[] = new Array();
  public userNutritionGoal: DomNutritionGoal;
  public recommendedNutritionGoal: DomNutritionGoal;
  public userProfile: DomUserFitnessProfile;
  public nutrientProgressRecords: NutrientProgressRecord[] = new Array();

  public showGoalsModalView: boolean = false;
  public showNutritionModalView: boolean = false;
  public showProfileModalView: boolean = false;
  public editingUserSavedRecord: boolean = false;
  public editingProgressRecord: boolean = false;

  public baseNutritionRecord: DomNutritionRecord;

  public initialBoxValue = "";
  public secondBoxValue = "";

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) {
    this.baseNutritionRecord = { Id: 0, Date: '', UserId: '', RecordType: '', RecordName: 'Untitled Record', NutrientRecordId: 0, Nutrients: new Array() }
    this.userProfile = new DomUserFitnessProfile();
    this.userProfile.UserAwardInfo = new UserAwardInfo();
  }

  public userSavedRecordSelectChange (event: any) {
    let pos = this.userSavedRecords.map(function(e) { console.log(e); return e.RecordName; }).indexOf(event.target.value);
    let record = this.userSavedRecords[pos];

    this.currentRecord = record;
    this.editingUserSavedRecord = true;
  }

  public userProgressRecordSelectChange (event: any) {
    let pos = this.userProgressRecords.map(function(e) { console.log(e); return e.RecordName; }).indexOf(event.target.value);
    let record = this.userProgressRecords[pos];

    this.currentRecord = record;
    this.editingProgressRecord = true;
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
      this.userProgressRecords = data.RecordCollection.UserDailyRecords;
      this.userSavedRecords = data.RecordCollection.UserSavedRecords;
      this.userNutritionGoal = data.UserDailyNutritionGoal;
      this.recommendedNutritionGoal = data.RecommendedNutritionGoal;
      this.userProfile = data.UserProfile;
      this.nutrientProgressRecords = data.NutrientProgressRecords;

      this.baseNutritionRecord.Nutrients = data.BaseNutrients;
      this.currentRecord = this.baseNutritionRecord;

      console.log(this.userProfile)

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
    });
  };

  public onOpenModalProfileView() {
    this.showProfileModalView = true;
    this.showNutritionModalView = false;
    this.showGoalsModalView = false;
  }

  public onOpenModalNutritionView() {
    this.showProfileModalView = false;
    this.showNutritionModalView = true;
    this.showGoalsModalView = false;

    this.editingProgressRecord = this.editingUserSavedRecord = false;
  }

  public onOpenModalGoalsView() {
    this.showProfileModalView = false;
    this.showNutritionModalView = false;
    this.showGoalsModalView = true;
  }

  public addNutritionRecord(saveUserRecord: boolean) : void {
    this.showThrobber = true;
    this.currentRecord.Id = 0;
    this.currentRecord.UserId = this.currentUser;
    this.currentRecord.RecordType = (saveUserRecord == true) ? "UserSaved" : "UserDaily";

    this.NutritionTrackerAppService.addNutritionRecord(this.currentRecord)
    .then(() => {
      this.retriveUserNutritionInfo()
    })
  };

  public updateNutritionRecord() {
    this.showThrobber = true;
    this.currentRecord.UserId = this.currentUser;

    this.NutritionTrackerAppService.updateNutritionRecord(this.currentRecord)
      .then(() => {
        this.retriveUserNutritionInfo()
      })
  }

  public updateUserNutritionGoal() {
    this.showThrobber = true;
    this.NutritionTrackerAppService.updateUserNutritionGoal(this.userNutritionGoal).then(() => {
      this.retriveUserNutritionInfo()
    })
  }

  public deleteNutritionRecord() {
    this.NutritionTrackerAppService.deleteNutritionRecord(this.currentRecord)
    .then(() => {
      this.retriveUserNutritionInfo();
    });
  }
}