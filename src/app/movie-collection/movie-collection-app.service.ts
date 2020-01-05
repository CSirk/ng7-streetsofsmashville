import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { MovieRecord } from './models/movie-record';

@Injectable()
export class MovieCollectionAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/moviecollectionapp/';
   //baseUrl: string = 'https://localhost:5001/api/moviecollectionapp/';

   public getMovieCollection() : Promise<MovieRecord[]> {
     let url = this.baseUrl + 'getmoviecollection';
     console.log(url)
     return this.http.get<MovieRecord[]>(url).toPromise();
   };

   public searchMovieCollection(searchType: string, searchTerm: string, userId: string) : Promise<MovieRecord[]> {
     let url = this.baseUrl + 'searchmoviecollection?searchType=' + searchType + '&searchTerm=' + searchTerm + '&userId=' + userId;
     return this.http.get<MovieRecord[]>(url).toPromise();
   }

   public AddMovieToCollection(movieRecordToAdd: MovieRecord) : Promise<boolean> {
      let url = this.baseUrl + 'addmovierecord';
      return this.http.post<boolean>(url, movieRecordToAdd).toPromise();
   }
}