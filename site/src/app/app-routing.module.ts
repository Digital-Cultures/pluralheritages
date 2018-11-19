import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent }      from './stories/stories.component';
import { AboutComponent }      from './about/about.component';
// import { MapsComponent }      from './maps/maps.component';
// import { TeamComponent }      from './team/team.component';
import { AppsComponent }      from './apps/apps.component';
import { ResearchComponent }      from './research/research.component';



const routes: Routes = [
{ path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'stories', component: StoriesComponent },
  { path: 'research', component: ResearchComponent},
  { path: 'about', component: AboutComponent },
  // { path: 'maps', component: MapsComponent },
  // { path: 'team', component: TeamComponent },
  { path: 'apps', component: AppsComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}