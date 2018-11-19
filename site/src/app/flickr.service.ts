import {Injectable} from '@angular/core';
// import {Http} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';

import 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
	
@Injectable()
export class FlickrService {
    result$: Observable<any>;
    key = 'c6d949d6c98d621ef1ba7a24df60c664';
    //T: any;
    constructor(private http: HttpClient) { };

    getResult(query: string) {
        //console.log(query)
        let url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=xxxx&user_id=137179301@N08&format=json&nojsoncallback=1';
        return this.http
            .get(url).pipe(
            map(res => res),
            //added type declaration (any) to val
            map((val : any ) => {
            	if(val){
                    console.log(val);
            		if(val.stat){
	                if (val.stat === 'ok') {
	                    return val.photos.photo.map((photo: any) => {
	                        return {
	                        	
	                            url: 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg',
	                            title: photo.title
	                        }
	                    })
	                }
	            }
            	}
                else {
                    return [];
                }
            }),).pipe(
        catchError(this.handleError('getResult', []))
        );
    }
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T> (operation = 'operation', result?: T) {
 	return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error("err1",error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
     return of (result as T);

};
}
}


// import { Injectable } from '@angular/core';
// // import { VIDEOS } from './video-list'; 
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { catchError, map, tap } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class FlickrService {
// //https://api.flickr.com/services/rest/?method=flickr.test.echo&api_key=c6d949d6c98d621ef1ba7a24df60c664&&photoset_id=137179301@N08&user_id=137179301@N08
// //key c6d949d6c98d621ef1ba7a24df60c664
// //secret c3694675852171b1

// private photoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=c6d949d6c98d621ef1ba7a24df60c664&&photo_id=37299789934";


// private flickrUserUrl = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=c6d949d6c98d621ef1ba7a24df60c664&&user_id=137179301@N08';  // URL to web api

// constructor(private http: HttpClient,) { }

// getFlickr(): Observable<any[]> {

//     return this.http.get<any[]>(this.flickrUserUrl)
//     .pipe(
//         catchError(this.handleError('getFlickr', []))
//         );
// }

// /**
//  * Handle Http operation that failed.
//  * Let the app continue.
//  * @param operation - name of the operation that failed
//  * @param result - optional value to return as the observable result
//  */
//  private handleError<T> (operation = 'operation', result?: T) {
//  	return (error: any): Observable<T> => {

//     // TODO: send the error to remote logging infrastructure
//     console.error("err1",error); // log to console instead

//     // TODO: better job of transforming error for user consumption
//     //this.log(`${operation} failed: ${error.message}`);

//     // Let the app keep running by returning an empty result.
//     return of(result as T);
// };
// }

// }
