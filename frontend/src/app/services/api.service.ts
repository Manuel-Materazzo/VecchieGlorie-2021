
import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {

    if (error.status === 401) {
      console.log('Unauthorized');
      sessionStorage.removeItem('current_user');
      sessionStorage.removeItem('UiProfileMap');
      return observableThrowError('Unauthorized');
    } else if (error.status === 404) {
      console.log('Not Found');
      return observableThrowError('Not Found');
    } else if (error.status === 500) {
      if (error.error.status === 'error') {
        return observableThrowError(error.error.message);
      }else{
        console.log("Internal server error");
      }
      if (error.error.code === '23505') {
        return observableThrowError('Duplicate key');
      }
      else {
        return observableThrowError('Internal Server Error');
      }
    } else if (error.status === 503) {
      console.log('Service Unavailable');
      return observableThrowError('Service Unavailable');
    } else if (error.message) {
      return observableThrowError(error.message);
    } else {
      return observableThrowError(error.json());
    }

  }

  syncget(path: string) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${sessionStorage.getItem('endpoint')}${path}` + "?token=" + sessionStorage.getItem("token"));
    xhr.send();
  }

  syncpost(path: string, body:any) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${sessionStorage.getItem('endpoint')}${path}` + "?token=" + sessionStorage.getItem("token"));
    xhr.send(body);
  }

  get(path: string, params): Observable<any> {
    return this.http.get(`${path}`,
      { params: params }).pipe(
        catchError(this.formatErrors),
        map((res: Response) => res));
  }

  get2(path: string, params): Observable<any> {

    let Headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    Headers.set('Content-Type', 'application/x-www-form-urlencoded');
    Headers.set('Accept', 'application/json');


    return this.http.get(path,
      { headers: Headers, params: params, withCredentials: true }).pipe(
        catchError(this.formatErrors),
        map((res: Response) => res));
  }

  ezPut(path: string, body: Object = {}): Observable<any>{
    return this.http.put(path, body).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

  put(path: string, body: Object = {}): Observable<any> {
    let Headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    Headers.set('Content-Type', 'application/x-www-form-urlencoded');
    Headers.set('Accept', 'application/json');


    return this.http.put(
      `${sessionStorage.getItem('endpoint')}${path}`,
      body,
      { headers: Headers, withCredentials: true }
    ).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

  ezPost(path: string, body: Object = {}): Observable<any>{
    return this.http.post(path, body).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }



  post(path: string, body: Object = {}): Observable<any> {
    let Headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    Headers.set('Content-Type', 'application/x-www-form-urlencoded');
    Headers.set('Accept', 'application/json');


    console.log(`${sessionStorage.getItem('endpoint')}${path}`);

    return this.http.post(
      `${sessionStorage.getItem('endpoint')}${path}`,
      body,
      { headers: Headers, withCredentials: true }
    ).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

  ezDelete(path: string): Observable<any>{
    return this.http.delete(path).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

  delete(path: string): Observable<any> {
    let Headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    Headers.set('Content-Type', 'application/x-www-form-urlencoded');
    Headers.set('Accept', 'application/json');


    return this.http.delete(
      `${sessionStorage.getItem('endpoint')}${path}`,

      { headers: Headers, withCredentials: true }
    ).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

  //Uso del metodo post per consentire l'inivio di un body (non possibile con http.delte)
  deleteAll(path: string, body:Object={}): Observable<any> {
    let Headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    Headers.set('Content-Type', 'application/x-www-form-urlencoded');
    Headers.set('Accept', 'application/json');

    return this.http.post(
      `${sessionStorage.getItem('endpoint')}${path}`,
      body,
      { headers: Headers, withCredentials: true }
    ).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res));
  }

}
