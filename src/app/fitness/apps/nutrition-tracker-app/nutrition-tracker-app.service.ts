import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';
import { NutritionProgressAggregate } from './models/nutrition-progress-aggregate';
import { NutritionRecord } from './models/nutrition-record';
import { NutrientProgressRecord } from './models/nutrient-progress-record';

@Injectable()
export class NutritionTrackerAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/fitness/';
   //baseUrl: string = 'https://localhost:5001/api/fitness/';

   public getNutritionRecordsByUserId(userId: string) : Promise<NutritionRecordAggregate> {
     let url = this.baseUrl + 'nutritionrecords/getbyuserid/' + userId;
     return this.http.get<NutritionRecordAggregate>(url).toPromise();
   };

   public getNutrientProgressByUserId(userId: string) : Promise<NutrientProgressRecord[]> {
     let url = this.baseUrl + 'nutrientprogress/getbyuserid/' + userId;
     return this.http.get<NutrientProgressRecord[]>(url).toPromise();
   };

   public addNutritionRecord(nutritionRecordToAdd: NutritionRecord) : Promise<boolean> {
     let url = this.baseUrl + 'nutritionrecords/addrecord';
     return this.http.post<boolean>(url, nutritionRecordToAdd).toPromise();
   };

   public deleteNutritionRecord(nutritionRecordToDelete: NutritionRecord) : Promise<boolean> {
     let url = this.baseUrl + 'nutritionrecords/delete/' + nutritionRecordToDelete.UserId + '/' + nutritionRecordToDelete.RecordName + '/' + nutritionRecordToDelete.RecordType;
     return this.http.delete<boolean>(url).toPromise();
   }
}