import { Component } from '@angular/core';
import { LanguageService } from './language.service';
import { IsMobileService } from './is-mobile.service';


@Component({
	selector: 'app-root',

	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']

})
export class AppComponent {
	constructor(private languageService: LanguageService,  private isMobileService: IsMobileService) { }
	language = 'EN';
	title = 'Plural Heritages of Istanbul';
	parentMessage = "message from parent"
	//console.log(this.isMobileService.getIsMobile());
	getIsMobile(){
		return this.isMobileService.getIsMobile();
	}
	onClickEN() {
		this.language = 'EN';
		this.parentMessage="EN";
		this.languageService.setLanguage("EN")
		console.log("EN");
	}
	onClickTR() {
		this.language = 'TR';
		this.parentMessage="TR";
				this.languageService.setLanguage("TR")

		console.log("TR");
	}
	getLanguage(){
		return this.languageService.getLanguage();
	}
	ngOnInit(){
		//console.log("is mobile:",this.isMobileService.getIsMobile());
	}
}
