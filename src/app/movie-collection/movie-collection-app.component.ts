import { Component, OnInit } from '@angular/core';
import { MovieRecord } from './models/movie-record';
import { MovieCollectionAppService } from './movie-collection-app.service';

@Component({
  templateUrl: './movie-collection-app.component.html'
})
export class MovieCollectionAppComponent {
  public appName = "Nutrition Tracker App"
  public currentUser: string;
  public showThrobber: boolean;
  public userLoaded: boolean;
  public collectionSearchTerm: string;

  public movieRecords: MovieRecord[];

  public searchTypes: string[] = new Array();

  constructor(public MovieCollectionAppService: MovieCollectionAppService) {
      this.searchTypes = ['Title', 'Actor', 'Year']
  }

  ngOnInit(): void {
      this.getMovieCollection();
  }

  public preventDefAndProp(event: Event) : void {
    event.stopPropagation();
    event.preventDefault();
  }

  public getMovieCollection() {
    this.MovieCollectionAppService.getMovieCollection().then((data) => {
        this.movieRecords = data;
    })
  }

  public getMoviesByPartialTitle() {
    this.MovieCollectionAppService.getMoviesByPartialTitle(this.collectionSearchTerm).then((data) => {
        this.movieRecords = data;
    })
  }

  public retrieveMovieRecords() {

  }

}