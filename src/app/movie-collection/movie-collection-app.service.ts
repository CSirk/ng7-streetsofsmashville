import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { MovieRecord } from './models/movie-record';

@Injectable()
export class MovieCollectionAppService {
   constructor(private http: HttpClient) {}

   results: string[];
   baseUrl: string = 'https://streetsofsmashvilleapi.azurewebsites.net/api/moviecollection/';
   //baseUrl: string = 'https://localhost:5001/api/moviecollection/';

   public getMovieCollection() : Promise<MovieRecord[]> {
     let url = this.baseUrl + 'getall';
     console.log(url)
     return this.http.get<MovieRecord[]>(url).toPromise();
   };

   public getMoviesByPartialTitle(partialTitle: string) : Promise<MovieRecord[]> {
    let url = this.baseUrl + 'getbypartialtitle?partialTitle=' + partialTitle;
    return this.http.get<MovieRecord[]>(url).toPromise();
   };

   public getMoviesByGenre(genre: string) : Promise<MovieRecord[]> {
    let url = this.baseUrl + 'getByGenre';
    return this.http.get<MovieRecord[]>(url).toPromise();
   };

   public getMovieGenres() : Promise<string[]> {
    let url = this.baseUrl + 'getgenres';
    return this.http.get<string[]>(url).toPromise();
   };

   public searchMovieCollection(searchType: string, searchTerm: string, userId: string) : Promise<MovieRecord[]> {
     let url = this.baseUrl + 'searchMovieCollection?searchType=' + searchType + '&searchTerm=' + searchTerm + '&userId=' + userId;
     return this.http.get<MovieRecord[]>(url).toPromise();
   }
}