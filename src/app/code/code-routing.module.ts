import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GitTutorialAppComponent } from './tutorials/git/git-tutorial.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { TutorialsAppComponent } from './tutorials/tutorials.component';

const routes: Routes = [
    { path: 'tutorials', component: TutorialsAppComponent },
    { path: 'tutorials/git-tutorial', component: GitTutorialAppComponent },
    { path: 'downloads', component: DownloadsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class CodeRoutingModule {}