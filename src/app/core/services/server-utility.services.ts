import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerUtilityService {
  WAITTIME = 60000;

  constructor(public http: HttpClient) {}

  public get(
    url,
    apiParams?,
    apiTimeout?
  ): Observable<any> {
    const apiHeaders = new HttpHeaders();
    const time = apiTimeout ? apiTimeout : this.WAITTIME;

    const options = {
      headers: apiHeaders,
      withCredentials: true,
      params: apiParams,
    };
    return this.http.get(url, options).pipe(
      timeout(time),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
