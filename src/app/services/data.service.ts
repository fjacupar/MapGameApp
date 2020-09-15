import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  findAll(url: string): Observable<any>{
    return this.http.get(url)
    .pipe(
      catchError(error => {
        console.log(error.message)
        return throwError(error);
      })
    )
  }
}
