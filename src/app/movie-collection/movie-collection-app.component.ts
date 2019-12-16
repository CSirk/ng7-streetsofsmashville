import { Component, OnInit } from '@angular/core';
import { MovieRecord } from './models/movie-record';
import { MovieCollectionAppService } from './movie-collection-app.service';

@Component({
  templateUrl: './movie-collection-app.component.html'
})
export class MovieCollectionAppComponent {
  public showThrobber: boolean;
  public searchTerm: string;

  public userId = "";
  public showError = false;
  public errorCode = "";

  public searchType = "Title";

  public movieRecords: MovieRecord[];

  public searchTypes: string[] = new Array();

  constructor(public MovieCollectionAppService: MovieCollectionAppService) {
      this.searchTypes = ['Title', 'Series', 'Actors', 'Year', 'Genre']
  }

  //ngOnInit(): void { }

  public preventDefAndProp(event: Event) : void {
    event.stopPropagation();
    event.preventDefault();
  }

  public changeSearchType(event: any) {
    let pos = this.searchTypes.map(function(e) { return e; }).indexOf(event.target.value);
    let record = this.searchTypes[pos];

    this.searchType = record;
  }

  public searchMovieCollection() {
    this.showError = false;
    this.showThrobber = true;
    this.MovieCollectionAppService.searchMovieCollection(this.searchType, this.searchTerm, this.userId).then((data) => {
      this.movieRecords = data;
      this.showThrobber = false;
    }).catch((error) => {
      console.log(error)
      this.showError = true;
      this.errorCode = error.status;
      this.movieRecords = new Array();
      this.showThrobber = false;
    })
  }
}