import { Component, OnInit } from '@angular/core';
import { MovieRecord } from './models/movie-record';
import { MovieCollectionAppService } from './movie-collection-app.service';

@Component({
  templateUrl: './movie-collection-app.component.html'
})
export class MovieCollectionAppComponent {
  
  // public modalOptions: Materialize.ModalOptions = {
  //   dismissible: false, // Modal can be dismissed by clicking outside of the modal
  //   opacity: .5, // Opacity of modal background
  //   inDuration: 300, // Transition in duration
  //   outDuration: 200, // Transition out duration
  //   startingTop: '100%', // Starting top style attribute
  //   endingTop: '10%', // Ending top style attribute
  //   ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
  //     alert('Ready');
  //     console.log(modal, trigger);
  //   },
  //   complete: () => { alert('Closed'); } // Callback for Modal close
  // };
  
  public currentRecordToEdit: MovieRecord = new MovieRecord();

  public showThrobber: boolean;
  public searchTerm: string;
  public addEditMovieRecordModalTitle: string;

  public selectedActors: string[] = new Array();

  public userId = '';
  public showError = false;
  public errorCode = '';
  public toAddEditIsDigital = "False";
  public toAddEditIsDisc = "False";
  public toAddEditIsFavorite = "False";
  public toAddEditIsOnWishlist = "False";
  public collectionLoaded = false;

  public searchType = 'Title';

  public movieRecords: MovieRecord[];

  public addEditMovieRecord: MovieRecord = new MovieRecord();
  public movieRecordToAdd: MovieRecord = new MovieRecord();

  public searchTypes: string[] = new Array('Title', 'Series', 'Actors', 'Year', 'Genre', 'Favorite', 'Wishlist', 'Digital', 'Disc');
  public genres: string[] = new Array('Action', 'Adventure', 'Animated', 'Comedy', 'Crime', 'Disney', 'Drama', 'Family', 'Horror', 
    'Mystery', 'Romance', 'Sci-Fi', 'Spy', 'Standup', 'Sports', 'Thriller');

  public selectedGenres: string[] = new Array();

  constructor(public MovieCollectionAppService: MovieCollectionAppService) {
      this.movieRecordToAdd.IsDigital = this.movieRecordToAdd.IsDisc = this.movieRecordToAdd.IsFavorite = 
      this.movieRecordToAdd.IsOnWishlist = false;
      this.movieRecordToAdd.Title = 'Test'
  }

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
      this.collectionLoaded = true;
    }).catch((error) => {
      console.log(error)
      this.showError = true;
      this.errorCode = error.status;
      this.movieRecords = new Array();
      this.showThrobber = false;
    })
  }

  public addMovieRecord() {
    this.showThrobber = true;
    let actorString = '';
    for(let i = 0; i < this.selectedActors.length; i++) {
      if(i != this.selectedActors.length - 1) {
        actorString += this.selectedActors[i] + ', ';
      } else {
        actorString += this.selectedActors[i]
      }
    }
    this.addEditMovieRecord.Actors = actorString;


    let genreString = '';
    for(let i = 0; i < this.selectedGenres.length; i++) {
      if(i != this.selectedGenres.length - 1) {
        genreString += this.selectedGenres[i] + ', ';
      } else {
        genreString += this.selectedGenres[i]
      }
    }
    this.addEditMovieRecord.Genre = genreString;

    this.addEditMovieRecord.IsDigital = (this.toAddEditIsDigital == "True") ? true : false;
    this.addEditMovieRecord.IsDisc = (this.toAddEditIsDisc == "True") ? true : false;
    this.addEditMovieRecord.IsFavorite = (this.toAddEditIsFavorite == "True") ? true : false;
    this.addEditMovieRecord.IsOnWishlist = (this.toAddEditIsOnWishlist == "True") ? true : false;

    

    console.log(this.addEditMovieRecord)
    
    this.MovieCollectionAppService.AddMovieToCollection(this.addEditMovieRecord).then(() => {
      this.addEditMovieRecord = new MovieRecord();
      this.showThrobber = false;
    })
  }

  public onActorChipAdd(event) {
    this.selectedActors.push(event.tag);
  }

  public onActorChipDelete(event) {
    let indexOfActor = this.selectedActors.indexOf(event.tag);
    this.selectedActors.splice(indexOfActor, 1)
  }

  public onOpenEditMovieRecordModal(record: MovieRecord) {
    this.addEditMovieRecordModalTitle = 'Edit Existing Movie Record (' + record.Title + ')';
    this.toAddEditIsDigital = (record.IsDigital == true) ? 'True' : 'False';
    this.toAddEditIsDisc = (record.IsDisc == true) ? 'True' : 'False';
    this.toAddEditIsFavorite= (record.IsFavorite == true) ? 'True' : 'False';
    this.toAddEditIsOnWishlist = (record.IsOnWishlist == true) ? 'True' : 'False';

    this.selectedGenres = new Array();
    var genres = record.Genre.split(',');
    for(let i = 0; i < genres.length; i++) {
      this.selectedGenres.push(genres[i]);
      
    }

    console.log(this.selectedGenres)


    //deep copy of edit record
    this.addEditMovieRecord = JSON.parse(JSON.stringify(record))
  }

  public onOpenAddMovieRecordModal() {
    this.addEditMovieRecordModalTitle = 'Add New Movie Record';
    this.addEditMovieRecord = new MovieRecord();
  }
}