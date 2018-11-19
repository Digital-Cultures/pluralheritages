import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { GtrService } from '../gtr.service';

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
	    {title: "different experiences of places and pasts", url: 'assets/images/Toolkit1_English_13-06-2018.pdf'},
	     {title: "YERLER VE GEÇMİŞLERLE İLGİLİ FARKLI DENEYİMLER", url: 'assets/images/Toolkit1_Turkish_13-06-2018.pdf'}
	]

	constructor(private gtrService: GtrService, private languageService: LanguageService) { }


	getGTR(): void {
		this.gtrService.getMendeleyData()
		.subscribe(  GTRData =>{
			
			if(GTRData==null) {
				console.log("null");
			}
			else{
				this.GTRData=GTRData;
				// console.log((GTRData),this.GTRData);
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
