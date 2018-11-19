import { Component } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
	selector: 'app-root',

	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']

})
export class AppComponent {
	constructor(private languageService: LanguageService) { }
	language = 'EN';
	title = 'Plural Heritages of Istanbul';
	parentMessage = "message from parent"
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
}
