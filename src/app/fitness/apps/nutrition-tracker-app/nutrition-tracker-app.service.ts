import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserNutritionInfo } from './models/user-nutrition-info';
import { DomNutritionRecord } from './models/dom-nutrition-record';

@Injectable()
export class NutritionTrackerAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/NutritionTrackerApp/';
   //baseUrl: string = 'https://localhost:5001/api/NutritionTrackerApp/';

   public addNutritionRecord(nutritionRecordToAdd: DomNutritionRecord) : Promise<boolean> {
     let url = this.baseUrl + 'AddNutritionRecord';
     return this.http.post<boolean>(url, nutritionRecordToAdd).toPromise();
   };

   public deleteNutritionRecord(nutritionRecordToDelete: DomNutritionRecord) : Promise<boolean> {
     let url = this.baseUrl + 'DeleteNutritionRecord';

     return this.http.request<boolean>('delete', url, { body: nutritionRecordToDelete}).toPromise();
   }

   public getUserNutritionInfo(userId: string) : Promise<UserNutritionInfo> {
     let url = this.baseUrl + 'GetNutritionInfoByUserId?userId=' + userId;
     return this.http.get<UserNutritionInfo>(url).toPromise();
   }

}