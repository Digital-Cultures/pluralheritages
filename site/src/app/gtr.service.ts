import { Injectable } from '@angular/core';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GtrService {
	//private tfidfUrl = 'http://localhost:8888/angular_2/subtitle_tfidf.json';  // URL to web api
private mendeleyDataUrl = 'https://gtr.ukri.org/gtr/api/projects/D76EAC9E-8A08-4AD8-89E4-0BD0A1F4F171/outcomes/publications';
  constructor(private http: HttpClient) { }
	getMendeleyData(): Observable<any[]> {

		let headers = new HttpHeaders().set('Accept', 'application/vnd.rcuk.gtr.json-v6');

	    return this.http.get<any[]>(this.mendeleyDataUrl, { headers: headers })
	    .pipe(
	        catchError(this.handleError('getMendeley', []))
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
