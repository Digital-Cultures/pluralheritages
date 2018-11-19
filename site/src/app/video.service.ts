import { Injectable } from '@angular/core';
import { Video } from './video';
// import { VIDEOS } from './video-list'; 
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VideoService {

//private videosUrl = 'http://localhost:8888/angular_2/combined_expanded.json';  // URL to web api
private videosUrl = 'assets/data/combined_expanded.json';  // URL to web api

constructor(private http: HttpClient,) { }

getVideos(): Observable<Video[]> {

    return this.http.get<Video[]>(this.videosUrl)
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
