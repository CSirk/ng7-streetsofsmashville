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
  public nutrients: Nutrient[] = new Array();
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

  public preventDefault(event: Event) : void {
    event.stopPropagation();
    event.preventDefault();
  }
  public deloadUser(event: any) : void {
    console.log('hit it')
    this.userLoaded = false;
  }

  // public retrieveNutritionRecordsForUser() : void {
  //   this.showThrobber = true;

  //   this.NutritionTrackerAppService.getAllContractsAndPackagesAggregate(this.currentUser).then((data) => {
  //     this.userNutritionRecordAggregate = data;
  //     this.userLoaded = true;
  //     this.showThrobber = false;
  //   })

  //   this.userSavedRecords.push(
  //     Apple,
  //     Orange
  //     )
  //   };

    public retriveNutritionDataForUser() : void {
      this.showThrobber = true;
      this.NutritionTrackerAppService.getNutritionRecordsByUserId(this.currentUser).then((data) => {
        this.userNutritionRecordAggregate = data;

console.log('saved global:')
console.log(this.userNutritionRecordAggregate.SavedGlobalNutritionRecords)

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
        console.log(data.NutritionGoal.Nutrients)
          this.userNutritionProgressAggregate = data;
          
          console.log(typeof(data))
          console.log(data.NutritionGoal)
          console.log(data.NutrientProgressTotal)
          console.log(data.NutrientProgressRemaining)
          console.log(data.ProgressRecords)

          this.userNutritionProgressAggregate = data;
          this.goalRecord = this.userNutritionProgressAggregate.NutritionGoal;
          this.userLoaded = true;
          this.showThrobber = false;
        })
      })
    };
}
