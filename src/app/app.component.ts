import { Component } from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  public appName = "Nutrition Tracker App"
  public showThrobber: boolean;
  public userLoaded: boolean;
  public userSavedRecords: string[] = new Array();

  public retrieveNutritionRecordsForUser() : void {
    this.showThrobber = true;
    this.userLoaded = true;
    this.userSavedRecords.push('cody', 'jed', 'kristen')
  }
}
