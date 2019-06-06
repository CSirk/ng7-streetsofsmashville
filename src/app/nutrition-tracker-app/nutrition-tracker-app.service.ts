import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';
import { NutritionProgressAggregate } from './models/nutrition-progress-aggregate';

@Injectable()
export class NutritionTrackerAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   //baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/fitness/';
   baseUrl: string = 'https://localhost:5001/api/fitness/';

   public getNutritionRecordsByUserId(userId: string) : Promise<NutritionRecordAggregate> {
        let url = this.baseUrl + 'nutritionrecords/getbyuserid/' + userId;
        return this.http.get<NutritionRecordAggregate>(url).toPromise();
   };

   public getNutritionProgressByUserId(userId: string) : Promise<NutritionProgressAggregate> {
        let url = this.baseUrl + 'nutritionprogress/getbyuserid/' + userId;
        return this.http.get<NutritionProgressAggregate>(url).toPromise();
   };
}