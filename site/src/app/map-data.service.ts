import { Injectable } from '@angular/core';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MapDataService {
	//private tfidfUrl = 'http://localhost:8888/angular_2/subtitle_tfidf.json';  // URL to web api
private mapDataUrl = 'assets/data/combined_maps.json';

  constructor(private http: HttpClient) { }
	getMapData(): Observable<any[]> {

	    return this.http.get<any[]>(this.mapDataUrl)
	    .pipe(
	        catchError(this.handleError('getVideos', []))
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
	    return of(result as T);
		};
	}

}
