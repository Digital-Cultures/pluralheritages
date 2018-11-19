

import { Injectable } from '@angular/core';
// import { VIDEOS } from './video-list'; 
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VimeoService {
private vimeoUrl = 'assets/data/combined_expanded.json';
//private vimeoUrl = 'http://localhost:8888/angular_2/combined_expanded.json';  // URL to web api

constructor(private http: HttpClient,) { }

getVimeo(): Observable<any[]> {

    return this.http.get<any[]>(this.vimeoUrl)
    .pipe(
        catchError(this.handleError('getVimeo', []))
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
