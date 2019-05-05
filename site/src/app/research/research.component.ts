import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { GtrService } from '../gtr.service';
import { IsMobileService } from '../is-mobile.service';

export interface type{
	title:string;
	url:string;
}


@Component({
	selector: 'app-research',
	templateUrl: './research.component.html',
	styleUrls: ['./research.component.css']
})
// export interface PDFtype{
// 	title:string;
// 	url:string;
// }


export class ResearchComponent implements OnInit {
	GTRData:any[];
	currentPDF:number;
	showPDFs:boolean;

	public PDFS:type[] = [
	    {title: "DIFFERENT EXPERIENCES OF PLACES AND PASTS", url: 'assets/images/toolkits/english/Toolkit1.pdf'},
	    {title: "WORKING WITH COMMUNITIES TO REVALORISE HERITAGE", url: 'assets/images/toolkits/english/Toolkit2.pdf'},
	    {title: "CREATING MEMORY MAPS", url: 'assets/images/toolkits/english/Toolkit3.pdf'},
	    {title: "UNDERSTANDING AND DOCUMENTING INTANGIBLE CULTURAL QUALITIES OF URBAN HERITAGE", url: 'assets/images/toolkits/english/Toolkit5.pdf'},
			{title: "RETHINKING ‘OUTSTANDING UNIVERSAL VALUE’ AT URBAN WORLD HERITAGE SITES", url: 'assets/images/toolkits/english/Toolkit6.pdf'},
			{title: "COMMUNITY CO-PRODUCTION", url: 'assets/images/toolkits/english/Toolkit4.pdf'},
	]

	public PDFS_TR:type[] = [
	    {title: "1) YERLER VE GEÇMİŞLERLE İLGİLİ FARKLI DENEYİMLER", url: 'assets/images/toolkits/turkish/Toolkit1_Turkish.pdf'},
	    {title: "2) TOPLUMLA ÇALIŞARAK KÜLTÜREL MİRASA YENİ DEĞER ATFETMEK", url: 'assets/images/toolkits/turkish/Toolkit2_Turkish.pdf'},
	    {title: "3) BELLEK HARİTALARI OLUŞTURMAK", url: 'assets/images/toolkits/turkish/Toolkit3_Turkish.pdf'},
	    {title: "4) KENTSEL MİRASIN SOMUT OLMAYAN KÜLTÜREL NİTELİKLERİNİ ANLAMAK VE BELGELEMEK", url: 'assets/images/toolkits/turkish/Toolkit5_Turkish.pdf'},
			{title: "5) KENTSEL DÜNYA MİRAS ALANLARINDA ‘ÜSTÜN EVRENSEL DEĞER’İ YENİDEN DÜŞÜNMEK", url: 'assets/images/toolkits/turkish/Toolkit6_Turkish.pdf'},
			{title: "6) BİRLİKTE ÜRETİM ÇALIŞMALARI", url: 'assets/images/toolkits/turkish/Toolkit4_Turkish.pdf'},
	]

	constructor( private isMobileService: IsMobileService, private gtrService: GtrService, private languageService: LanguageService) { }
	generateArray(obj){
	   return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
	}
	getIsMobile(){
		return this.isMobileService.getIsMobile();
	}
	getLanguage(){
		return this.languageService.getLanguage();
	}

	getGTR(): void {
		this.gtrService.getMendeleyData()
		.subscribe(  GTRData =>{
			
			if(GTRData==null) {
				console.log("null");
			}
			else{
				if (GTRData.hasOwnProperty('publication')) {
				this.GTRData=GTRData['publication'];
				console.log(this.GTRData.length);
				for (var i = 0; i < this.GTRData.length; i++) { 
				  // do something
				}
				// for (var i in this.GTRData) {
				//      if (this.GTRData.hasOwnProperty(property)) {
				//          console.log("property",property, GTRData[property]);
				//      }
				//  }
				}
			 console.log("GTRData",this.GTRData,typeof(this.GTRData));
			}
			// this.GTRData=GTRData;
			
		});
	}
	ngOnInit() {
		// this.GTRData.push({test:"this"});
		this.getGTR();
	}
	isObject(val) { return typeof val === 'object'; }
	getDateFromTimeStamp(unix_timestamp:number){
		// console.log("unix_timestamp",unix_timestamp);
		var date = new Date(unix_timestamp);
		// Hours part from the timestamp
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp
		var seconds = "0" + date.getSeconds();

		// Will display time in 10:30:23 format
		var formattedTime =year;// hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		return formattedTime;
	}
	setCurrentPDF(index:number){
		console.log("setting pdf as ",index);
		this.currentPDF = index;
		this.showPDFs = true;
	}

}
