import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule } from '@angular/forms';
import { VidFilterPipe } from './vid-filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AppsComponent } from './apps/apps.component';
import { ResearchComponent } from './research/research.component';
import { StoriesComponent } from './stories/stories.component';

//services
import { VimeoService } from './vimeo.service';
import { FlickrService } from './flickr.service';
import { TfidfService } from './tfidf.service';
import { TfidfTrService } from './tfidf-tr.service';

import { MapDataService } from './map-data.service';
import { MapDataTrService } from './map-data-tr.service';
import { IsMobileService } from './is-mobile.service';
import { GtrService } from './gtr.service';
import { VideoService } from './video.service'; // <-- NgModel lives here

import { VideoTrService } from './video-tr.service'; // <-- NgModel lives here



import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AppsComponent,
    VidFilterPipe,
    ResearchComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgPipesModule,
    AppRoutingModule,
    PdfViewerModule
  ],
  providers: [
  VideoService,
  VideoTrService,
  IsMobileService,
    TfidfService,
    TfidfTrService,
    VimeoService,
    FlickrService,
    MapDataService,
    MapDataTrService,
    GtrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
