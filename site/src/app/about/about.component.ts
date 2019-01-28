import { Component, OnInit, Input} from '@angular/core';
import { LanguageService } from '../language.service';
import { IsMobileService } from '../is-mobile.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	 
  constructor(private isMobileService: IsMobileService,public languageService: LanguageService) { }
  lang="";

  ngOnInit() {
  	this.getLanguage();
  	console.log("language",this.lang );
  	
  }
  getLanguage(): void {
  this.lang = this.languageService.getLanguage();
	}
  getIsMobile(){
    return this.isMobileService.getIsMobile();
  }
}
