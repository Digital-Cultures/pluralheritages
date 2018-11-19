import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { ExpandedVideo } from '../expanded-video';
// import { VIDEOS } from '../video-list';
import { VideoService } from '../video.service';
import { LanguageService } from '../language.service';

import { TfidfService } from '../tfidf.service';
import { MapDataService } from '../map-data.service';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { MyInterface} from '../my-interface';
import { FlickrService } from '../flickr.service';

import { GtrService } from '../gtr.service';

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
	mapData:any[];
	mendeley:any[];
	expandedVideos: ExpandedVideo[] = [];
	showThumbnails: boolean [];
	filteredVideos: ExpandedVideo[];
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




	constructor( private gtrService: GtrService,private mapDataService: MapDataService, private languageService: LanguageService, private videoService: VideoService,private flickrService: FlickrService, private sanitizer: DomSanitizer, private tfidfService: TfidfService) { }
	getFlickr(): void {
		this.flickrService.getResult("bird")
		.subscribe(  flickr =>{
			this.photos = flickr;
			console.log(flickr);
		});
	}
	setActiveMap(url:string){
		this.currentMap=url;
		this.showMap=true;
	}
	getVideoForTitle(vimeoID:string, time:string){
		this.currentVideo = vimeoID+"#t="+time;
		this.showVideo=true;
	}
	setSearchAsTag(word:string){
		this.searchterm = word;
		this.filteredVideos = this.getFilteredVideos(this.searchterm);

		console.log("click",word);
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
		console.log(video);
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

						if( subs[i].text.indexOf(this.searchterm)>-1 ){	

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
		console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}
	getCurrentVideoURL(){
		// var testLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		//console.log("link",link);


		var embedLink = "https://player.vimeo.com/video/"+this.currentVideo;
		console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}
	getCurrentMapURL(){
		// var testLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		//console.log("link",link);


		var embedLink = this.currentMap;
		console.log(embedLink);

		return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
	}

	navigate($event){
		//console.log("key up", this.searchterm);
		this.filteredVideos = this.getFilteredVideos(this.searchterm);
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
	getVimeoThumb(){
		return this.videos;
	}
	getFilteredVideos(search: string){
		//info on binding this https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		return this.expandedVideos.filter(this.checkSubs.bind(this));//this.model.rows.filter((row) => row.rowIndex >= this.model.start && row.rowIndex < this.model.end);
	}


	ngOnInit() {
		this.getVideos();
		this.getTFIDF();
		this.getFlickr();
		this.getMapData();
		this.getMendeley();
		console.log("map stories",this.mapStories);
	}
	getMendeley():void{
		this.gtrService.getMendeleyData()
		.subscribe(  mendeley =>{
			this.mendeley =  mendeley;
			console.log("mendeley",this.mendeley);
		});
	}

	getTFIDF(): void {
		this.tfidfService.getTFIDF()
		.subscribe(  tfidf =>{
			this.tfidf =  tfidf;
			console.log(this.tfidf);
		});
	}

	getMapData(): void {
		this.mapDataService.getMapData()
		.subscribe(  mapData =>{
			this.mapData =  mapData;
			console.log("map data",this.mapData);
		});
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
