import { Component } from '@angular/core';
import { NutritionTrackerAppService } from './nutrition-tracker-app.service';
import { DomNutritionRecord } from './models/dom-nutrition-record';
import { UserNutritionInfo } from './models/user-nutrition-info';
import { DomNutrient } from './models/dom-nutrient';
import { DisplayNutritionRecord } from './models/display-nutrition-record';
import { DomNutritionGoal } from './models/dom-nutrition-goal';
import { DisplayGoalRecord } from './models/display-goal-record';

@Component({
  templateUrl: './nutrition-tracker-app.component.html'
})
export class NutritionTrackerAppComponent {
  currentUser: string;
  userLoaded: boolean;
  showThrobber: boolean;
  showGoalsModalView: boolean;
  showNutritionModalView: boolean;
  showProfileModalView: boolean;
  editingUserSavedRecord: boolean;
  editingProgressRecord: boolean;
  userNutritionInfo: UserNutritionInfo;
  currentNutritionRecord: DisplayNutritionRecord = new DisplayNutritionRecord();
  currentGoalRecord: DisplayGoalRecord = new DisplayGoalRecord();
  initialBoxValue = "";
  secondBoxValue = "";

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false
  };

  constructor(public NutritionTrackerAppService: NutritionTrackerAppService) { }

  public userSavedRecordSelectChange (event: any) {
    let pos = this.userNutritionInfo.RecordCollection.UserSavedRecords.map(function(e) { return e.RecordName; }).indexOf(event.target.value);
    let record = this.userNutritionInfo.RecordCollection.UserSavedRecords[pos];

    this.setDisplayRecord(record);
    this.editingUserSavedRecord = true;
  }

  public userDailyRecordSelectChange (event: any) {
    let pos = this.userNutritionInfo.RecordCollection.UserDailyRecords.map(function(e) { return e.RecordName; }).indexOf(event.target.value);
    let record = this.userNutritionInfo.RecordCollection.UserDailyRecords[pos];

    this.setDisplayRecord(record);
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
    let recGoalNutrients = this.userNutritionInfo.RecommendedNutritionGoal.Nutrients;
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
    this.toggleThrobber(true);
    this.NutritionTrackerAppService.getUserNutritionInfo(this.currentUser).then((data) => {

      this.userNutritionInfo = data;
      this.currentNutritionRecord.Nutrients = JSON.parse(JSON.stringify(data.BaseNutrients));
      this.currentGoalRecord.Nutrients = JSON.parse(JSON.stringify(data.BaseNutrients));
      
      this.userLoaded = true;
      this.toggleThrobber(false);
    });
  };

  onOpenModalView(modalName: string) {
    if(modalName == "profile") {
      this.showProfileModalView = true;
      this.showGoalsModalView = this.showNutritionModalView = false;
    } else if (modalName == "nutrition") {
      this.showNutritionModalView = true;
      this.showProfileModalView = this.showGoalsModalView = false;
    } else if (modalName == "goals") {
      this.setGoalDisplayRecord(this.userNutritionInfo.UserDailyNutritionGoal);
      this.showGoalsModalView = true;
      this.showProfileModalView = this.showNutritionModalView = false;
    }
  }
  
  public addNutritionRecord(saveUserRecord: boolean) : void {
    this.toggleThrobber(true);

    let nutritionRecordToAdd: DomNutritionRecord =
    {
      Id: 0,
      Nutrients: new Array(),
      UserId: this.userNutritionInfo.UserProfile.UserId,
      RecordType: (saveUserRecord == true) ? "UserSaved" : "UserDaily",
      RecordName: this.currentNutritionRecord.RecordName,
      Date: ""
    };

    this.currentNutritionRecord.Nutrients.forEach(x => nutritionRecordToAdd.Nutrients.push({Name: x.Name, Amount: x.Amount}));

    this.NutritionTrackerAppService.addNutritionRecord(nutritionRecordToAdd).then(() => {
      this.retriveUserNutritionInfo()
    })
  }

  public updateNutritionRecord() {
    this.toggleThrobber(true);
    this.currentNutritionRecord.UserId = this.currentUser;

    let recordToUpdate: DomNutritionRecord =
    {
      Id: this.currentNutritionRecord.Id,
      Nutrients: new Array(),
      UserId: this.userNutritionInfo.UserProfile.UserId,
      RecordType: this.currentNutritionRecord.RecordType,
      RecordName: this.currentNutritionRecord.RecordName,
      Date: ""
    };

    this.currentNutritionRecord.Nutrients.forEach(x => recordToUpdate.Nutrients.push({Name: x.Name, Amount: x.Amount}));

    this.NutritionTrackerAppService.updateNutritionRecord(recordToUpdate)
    .then(() => {
      this.retriveUserNutritionInfo()
    })
  }

  public updateUserNutritionGoal() {
    this.toggleThrobber(true);
    this.currentGoalRecord.UserId = this.userNutritionInfo.UserProfile.UserId;
    this.NutritionTrackerAppService.updateUserNutritionGoal(this.currentGoalRecord)
    .then(() => {
      this.retriveUserNutritionInfo()
    })
  }

  public deleteNutritionRecord() {
    this.toggleThrobber(true);
    this.NutritionTrackerAppService.deleteNutritionRecord(this.currentNutritionRecord)
    .then(() => {
      this.retriveUserNutritionInfo();
    });
  }

  public setDisplayRecord(record: DomNutritionRecord) {
    this.currentNutritionRecord.Id = record.Id;
    this.currentNutritionRecord.RecordName = record.RecordName;
    this.currentNutritionRecord.RecordType = record.RecordType;
    this.currentNutritionRecord.Nutrients.forEach(element => {
      let index = record.Nutrients.map(function(e) { return e.Name; }).indexOf(element.Name);
      if(index !== -1) {
        element.Amount = record.Nutrients[index].Amount;
      } else {
        element.Amount = 0;
      }
    });
  }

  public setGoalDisplayRecord(record: DomNutritionGoal) {
    this.currentGoalRecord.Id = record.Id;
    this.currentGoalRecord.UserId = record.UserId;
    this.currentGoalRecord.Nutrients.forEach(element => {
      let index = record.Nutrients.map(function(e) { return e.Name; }).indexOf(element.Name);
      if(index !== -1) {
        element.Amount = record.Nutrients[index].Amount;
      } else {
        element.Amount = 0;
      }
    });
  }

  toggleThrobber(show: boolean) {
    if(show === true) {
      this.showThrobber = true;
    } else {
      this.showThrobber = false;
    }
  }

  resetNutritionRecordToBase() {
    this.currentNutritionRecord.Id = 0;
    this.currentNutritionRecord.RecordName = "";
    this.currentNutritionRecord.RecordType = "";
    this.currentNutritionRecord.Nutrients = JSON.parse(JSON.stringify(this.userNutritionInfo.BaseNutrients));
  }

  resetGoalRecordToBase() {
    this.currentGoalRecord.Id = 0;
    this.currentGoalRecord.Nutrients = JSON.parse(JSON.stringify(this.userNutritionInfo.BaseNutrients));
  }

  cancelNutritionModal() {
    this.resetNutritionRecordToBase();
  }

  cancelGoalModal() {
    this.resetGoalRecordToBase();
  }
}