import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import {  catchError,timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerUtilityService {

    WAITTIME = 60000;
 
    constructor(public http: HttpClient) {
    }
  
    public get(url,header = [],apiTimeout?) : Observable<any> {
        let headers = new HttpHeaders();
        let time = apiTimeout ? apiTimeout : this.WAITTIME;

        const options = { headers: headers, withCredentials: true};
        return this.http
                    .get(url,options)
                    .pipe(
                        timeout(time),
                        catchError(error => {return throwError(error)})
                    );
    }

    public post(url, data, header, apiTimeout?) : Observable<any> {
        let headers = header;
        let timeout = apiTimeout ? apiTimeout : this.WAITTIME;

        const options = { headers : headers, withCredentials: true}
        return this.http
        .post(url, data, options)
        .pipe(timeout(timeout),
                catchError(error =>
                    { return throwError(error)})
            );
    }

    public put(url, data, header, apiTimeout?) : Observable<any> {
        let headers = new HttpHeaders();
        let timeout = apiTimeout ? apiTimeout : this.WAITTIME;

        const options = { headers : headers, withCredentials: true}
        return this.http
        .put(url, data, options)
        .pipe(timeout(timeout),
                catchError(error =>
                    { return throwError(error)}));
    }

    public delete(url , header, apiTimeout?) : Observable<any> {
        let headers = new HttpHeaders();
        let timeout = apiTimeout ? apiTimeout : this.WAITTIME;

        const options = { headers : headers, withCredentials: true}
        return this.http
        .delete(url, options)
        .pipe(timeout(timeout),
                catchError(error =>
                    { return throwError(error)}));
    }
}