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
        // {RecordName: "Orange", Nutrients:{ Calories: 200, Fat: 0, SaturatedFat: 0, Sodium: 0, Carbohydrates: 0, Cholesterol: 0, Sugar: 0, Fiber: 0, Protein: 0, Potassium: 0, VitaminA: 0, VitaminB1: 0, VitaminB2: 0, VitaminB3: 0, VitaminB4: 0, VitaminB6: 0, VitaminB12: 0, VitaminC: 0, VitaminD: 0, VitaminE: 0, VitaminH: 0, VitaminK: 0, FolicAcid: 0, Calcium: 0, Iron: 0, Chromium: 0, Caffeine: 0, Water: 0, Zinc: 0, Magnesium: 0},
        // {RecordName: "Apple", Calories: 300, Fat: 0, SaturatedFat: 0, Sodium: 0, Carbohydrates: 0, Cholesterol: 0, Sugar: 0, Fiber: 0, Protein: 0, Potassium: 0, VitaminA: 0, VitaminB1: 0, VitaminB2: 0, VitaminB3: 0, VitaminB4: 0, VitaminB6: 0, VitaminB12: 0, VitaminC: 0, VitaminD: 0, VitaminE: 0, VitaminH: 0, VitaminK: 0, FolicAcid: 0, Calcium: 0, Iron: 0, Chromium: 0, Caffeine: 0, Water: 0, Zinc: 0, Magnesium: 0},
        // {RecordName: "Grape", Calories: 400, Fat: 0, SaturatedFat: 0, Sodium: 0, Carbohydrates: 0, Cholesterol: 0, Sugar: 0, Fiber: 0, Protein: 0, Potassium: 0, VitaminA: 0, VitaminB1: 0, VitaminB2: 0, VitaminB3: 0, VitaminB4: 0, VitaminB6: 0, VitaminB12: 0, VitaminC: 0, VitaminD: 0, VitaminE: 0, VitaminH: 0, VitaminK: 0, FolicAcid: 0, Calcium: 0, Iron: 0, Chromium: 0, Caffeine: 0, Water: 0, Zinc: 0, Magnesium: 0},
      )

    //this.nutrients = NUTRIENTS;
    console.log(this.currentRecord)
    }

  public selectNutritionRecord(record: NutritionRecord) {
    console.log(record)
    this.currentRecord = record;
  }
}
