import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MzButtonModule, MzSelectModule, MzInputModule, MzTabModule, MzCardModule, MzProgressModule, MzIconModule, MzIconMdiModule, MzTooltipModule, MzCollapsibleModule } from 'ngx-materialize';


import { CodeRoutingModule } from './code-routing.module';
import { TutorialsAppComponent } from './tutorials/tutorials.component';
import { GitTutorialAppComponent } from './tutorials/git/git-tutorial.component';
import { DownloadsComponent} from './downloads/downloads.component';
import { SpinnerModule } from '../common/spinner/spinner.module';

@NgModule({
  declarations: [
      DownloadsComponent,
      TutorialsAppComponent,
      GitTutorialAppComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    MzButtonModule,
    MzSelectModule,
    MzTabModule,
    MzInputModule,
    MzCardModule,
    MzProgressModule,
    MzIconMdiModule,
    MzIconModule,
    MzTooltipModule,
    MzCollapsibleModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [],
})
export class CodeModule { }
