import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { ExpandedVideo } from '../expanded-video';
// import { VIDEOS } from '../video-list';
import { VideoService } from '../video.service';
import { VideoTrService } from '../video-tr.service';


import { LanguageService } from '../language.service';

import { TfidfService } from '../tfidf.service';
import { TfidfTrService } from '../tfidf-tr.service';

import { MapDataService } from '../map-data.service';
import { MapDataTrService } from '../map-data-tr.service';


import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { MyInterface} from '../my-interface';
import { FlickrService } from '../flickr.service';

import { GtrService } from '../gtr.service';

import { VidFilterPipe } from '../vid-filter.pipe';
import { IsMobileService } from '../is-mobile.service';

export interface type{
	title:string;
	url:string;
}



@Component({
	selector: 'app-stories',
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.css']
	
})
/*
*/

///https://youtu.be/9yp7uWMDzOk
export class StoriesComponent implements OnInit {
	photos : any [];
	searchterm : string="";
	//filterargs = {title: 'hello'};
	videos: Video[];
	tfidf: any[];
	tfidf_tr:any[];
	mapData:any[];
	mapTrData:any[];
	mendeley:any[];

	expandedVideos: ExpandedVideo[] = [];
	expandedVideosTr: ExpandedVideo[] = [];

	showThumbnails: boolean [];

	filteredVideos: ExpandedVideo[];
	filteredVideosTr: ExpandedVideo[];

	videoUrl: SafeResourceUrl;
	//var obj: {[k: string]: any} = {};
	looseVideos: MyInterface = {};
	vid : ExpandedVideo;
	currentVideo:string;
	currentMap:string;
	showVideo:boolean=false;
	showMap:boolean=false;
	public mapStories:type[] = [
	{title: "gardens", url: 'https://arcg.is/1rimO4'},
	{title: "tour", url: 'https://arcg.is/m4KyP'}
	];




	constructor(private isMobileService: IsMobileService, private gtrService: GtrService,private mapDataService: MapDataService,private mapDataTrService: MapDataTrService, private languageService: LanguageService, private videoService_tr: VideoTrService, private videoService: VideoService,private flickrService: FlickrService, private sanitizer: DomSanitizer, private tfidfService: TfidfService, private tfidfService_tr: TfidfTrService) { }
	getFlickr(): void {
		this.flickrService.getResult("bird")
		.subscribe(  flickr =>{
			this.photos = flickr;
			console.log(flickr);
		});
	}
	getIsMobile(){
		return this.isMobileService.getIsMobile();
	}
	setActiveMap(url:string){
		this.currentMap=url;
		this.showMap=true;
	}
	getLanguage(){
		return this.languageService.getLanguage();
	}
	getVideoForTitle(vimeoID:string, time:string){
		this.currentVideo = vimeoID+"#t="+time;
		this.showVideo=true;
	}
	setSearchAsTag(word:string){
		this.searchterm = word;
		this.filteredVideos = this.getFilteredVideos(this.searchterm);

		//console.log("click",word);
	}

	setSearchAsTagTr(word:string){
		this.searchterm = word;
		this.filteredVideosTr = this.getFilteredTrVideos(this.searchterm);

		//console.log("click",word);
	}

	updateVideoUrl(id: string) {
		// Appending an ID to a YouTube URL is safe.
		// Always make sure to construct SafeValue objects as
		// close as possible to the input data so
		// that it's easier to check if the value is safe.
		// this.videoUrl =
		this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
	}
	getMatchingFirst(sub: string){
		console.log(this.searchterm,sub,sub.indexOf(this.searchterm));

		// subs.indexOf(this.searchterm)===-1
		if(sub.indexOf(this.searchterm)>-1)  return sub;
		return "";
	}

	//not used I think
	getMatchingSub(subs: any){
		var matching_subs="";

		if(subs){

			for (var i = 0; i < subs.length; i++) {
				if(subs[i]){
					if(subs[i].text){ 
						//searchterm : string="";
						var temp ="the city walls";

						if(  subs[i].text.indexOf(this.searchterm)>-1 ){	
							matching_subs += subs[i].text;			// 		// matching_subs += subs[i].text;
							matching_subs += " : ";
							matching_subs += subs[i].timecode;
							matching_subs += "\n";

						}
					}
					else{
						//console.log("no subs text",subs[i]);
					}
				}
				//console.log("no subs",subs);
				// }
			}
		}
		return matching_subs;

	}
	onSubClicked(sub:string, video:ExpandedVideo, i: number){
		video.show = ! video.show;//true;
		//console.log(video);
		var hrs = parseInt(sub.substring(0,2));
		var mins = parseInt(sub.substring(3,5));
		var secs = parseInt(sub.substring(6,8));

		var total_secs  = (mins * 60) + secs;

		//#t=10s

		video.current_time_code = "#t="+total_secs.toString() +"s";

	}
	getMatchingSubObject(subs: any){
		var matching_subs=[];

		if(subs){

			for (var i = 0; i < subs.length; i++) {
				if(subs[i]){
					if(subs[i].text){ 

						if( subs[i].text.indexOf(this.searchterm.toLowerCase())>-1 ){	

							matching_subs.push({
								text:subs[i].text,
								timecode: subs[i].timecode
							});

						}
					}
					else{
					}
				}

			}
		}
		return matching_subs;

	}


	getVideoUrl(video:ExpandedVideo){
		// var testLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		//console.log("link",link);

		var exploded = video.vimeo_link.split("/");
		var code = "";
		if(exploded.length>0){
			code = exploded[exploded.length-1];
		}

		var embedLink = "https://player.vimeo.com/video/"+code+video.current_time_code;
		//console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}
	getCurrentVideoURL(){
		// var testLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		////console.log("link",link);


		var embedLink = "https://player.vimeo.com/video/"+this.currentVideo;
		//console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}
	getCurrentMapURL(){
		// var testLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		////console.log("link",link);


		var embedLink = this.currentMap;
		//console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}

	navigate($event){
		////console.log("key up", this.searchterm);
		if(this.languageService.getLanguage()=='EN'){
			this.filteredVideos = this.getFilteredVideos(this.searchterm);

		}
		else{
			this.filteredVideosTr = this.getFilteredTrVideos(this.searchterm);

		}
	}

	stringMatches(needle, haystack){
		var found = false;
		var no_punctuation = haystack.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		var no_spaces=no_punctuation.replace(/\s{2,}/g," ");
		var lower = no_spaces.toLowerCase();
		var exploded = lower.split(" ");

		var needle_lower =needle.toLowerCase();
		for(var i=0;i<exploded.length;i++){
			console.log(needle_lower, exploded[i]);
			if(needle_lower == exploded[i]){
				found = true;
			}
		}
		return found;
	}	

	checkSubs(element, index, array){
		var subs="";

		//console.log("Bound",this.searchterm);
		for (var i = 0; i < element.subs.length; ++i) {
			subs+=element.subs[i].text;
		}
		return subs.toLowerCase().indexOf(this.searchterm.toLowerCase())>-1;
	}
	checkSubsTr(element, index, array){
		var subs="";

		//console.log("Bound",this.searchterm);
		for (var i = 0; i < element.subs.length; ++i) {
			subs+=element.subs[i].text;
		}
		return subs.toLowerCase().indexOf(this.searchterm.toLowerCase())>-1;
	}
	getVimeoThumb(){
		return this.videos;
	}
	getFilteredVideos(search: string){
		//info on binding this https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		return this.expandedVideos.filter(this.checkSubs.bind(this));//this.model.rows.filter((row) => row.rowIndex >= this.model.start && row.rowIndex < this.model.end);
	}
	getFilteredTrVideos(search: string){
		//info on binding this https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		return this.expandedVideosTr.filter(this.checkSubsTr.bind(this));//this.model.rows.filter((row) => row.rowIndex >= this.model.start && row.rowIndex < this.model.end);
	}


	ngOnInit() {
		this.getVideos();
		this.getVideosTr();
		this.getTFIDF();
		this.getTFIDFTr();
		this.getFlickr();
		this.getMapData();
		this.getMapTrData();
		this.getMendeley();
		//console.log("map stories",this.mapStories);
	}
	getMendeley():void{
		this.gtrService.getMendeleyData()
		.subscribe(  mendeley =>{
			this.mendeley =  mendeley;
			//console.log("mendeley",this.mendeley);
		});
	}

	getTFIDF(): void {
		this.tfidfService.getTFIDF()
		.subscribe(  tfidf =>{
			this.tfidf =  tfidf;
			//console.log(this.tfidf);
		});
	}
	getTFIDFTr(): void {
		this.tfidfService_tr.getTFIDF()
		.subscribe(  tfidf =>{
			this.tfidf_tr =  tfidf;
			//console.log(this.tfidf_tr);
		});
	}

	getMapData(): void {
		this.mapDataService.getMapData()
		.subscribe(  mapData =>{
			this.mapData =  mapData;
			//console.log("map data",this.mapData);
		});
	}

	getMapTrData(): void {
		this.mapDataTrService.getMapData()
		.subscribe(  mapData =>{
			this.mapTrData =  mapData;
			//console.log("map data",this.mapTrData);
		});
	}
	getVideosTr(): void {
		//this.assignCopy();
		this.videoService_tr.getVideos()
		.subscribe(  videos =>{

			for (var i = 0; i < videos.length; ++i) {
				let myVid : ExpandedVideo ={
					index:videos[i].index ,
					vimeo_link:videos[i].vimeo_link ,
					participant_name:videos[i].participant_name ,
					activity:videos[i].activity ,
					subtitleFname:videos[i].subtitleFname ,
					subs:videos[i].subs ,
					show: false,
					current_time_code:""

				};

				this.expandedVideosTr.push(myVid);

			}

		} 


		)


	}

	getVideos(): void {
		//this.assignCopy();
		this.videoService.getVideos()
		.subscribe(  videos =>{

			for (var i = 0; i < videos.length; ++i) {
				let myVid : ExpandedVideo ={
					index:videos[i].index ,
					vimeo_link:videos[i].vimeo_link ,
					participant_name:videos[i].participant_name ,
					activity:videos[i].activity ,
					subtitleFname:videos[i].subtitleFname ,
					subs:videos[i].subs ,
					show: false,
					current_time_code:""

				};

				this.expandedVideos.push(myVid);

			}

		} 


		)


	}
}
