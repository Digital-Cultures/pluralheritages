import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
	language = "testLanguage";
  constructor() { 
  	this.language="EN";
  }
  getLanguage() {
  return this.language;
}
setLanguage(newLanguage){
   this.language = newLanguage;
   console.log("set labg as ",newLanguage);
}

}
