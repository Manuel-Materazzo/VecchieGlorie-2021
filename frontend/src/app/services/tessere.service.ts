import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {Tessera} from "../Objects/tessera";

@Injectable({ providedIn: 'root' })
export class TessereService {

  constructor(private api: ApiService) { }

  getAllTessera(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllTessera/", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteTessera(id: number): Observable<any> {
    return this.api.ezDelete("http://localhost:8080/ClubAutoDEpoca/deleteTesseraById/" + id).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteListaTessera(idList: number[]): Observable<any>{
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/deleteTesseraByListId/", idList).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  updateTessera(id: number, tessera: Tessera): Observable<any> {
    return this.api.ezPut("http://localhost:8080/ClubAutoDEpoca/updateTessera/" + id, tessera).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  createTessera(tessera: Tessera): Observable<any> {
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/createTessera/", tessera).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

}
