import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { NutritionRecordAggregate } from './models/nutrition-record-aggregate';

@Injectable()
export class NutritionTrackerAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/fitness/';

   public getAllContractsAndPackagesAggregate(userId: string) : Promise<NutritionRecordAggregate> {
       let url = this.baseUrl + 'nutritionrecords/getbyuserid/' + userId;
       return this.http.get<NutritionRecordAggregate>(url).toPromise();
   }
}