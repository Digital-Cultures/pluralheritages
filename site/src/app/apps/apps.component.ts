import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { IsMobileService } from '../is-mobile.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  constructor(private isMobileService: IsMobileService, public languageService: LanguageService) { }

  ngOnInit() {
  }
  getIsMobile(){
		return this.isMobileService.getIsMobile();
	}

}
