import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {Auto} from "../Objects/auto";

@Injectable({ providedIn: 'root' })
export class GarageService {

  constructor(private api: ApiService) { }

  getAllAuto(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllAuto", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteAuto(id: string): Observable<any> {
    return this.api.ezDelete("http://localhost:8080/ClubAutoDEpoca/deleteAutoById/" + id).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteListaAuto(idList: string[]): Observable<any>{
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/deleteAutoByListId/", idList).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  updateAuto(id: string, auto: Auto): Observable<any> {
    return this.api.ezPut("http://localhost:8080/ClubAutoDEpoca/updateAuto/" + id, auto).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  createAuto(auto: Auto): Observable<any> {

    const formData :FormData = new FormData();

    formData.append('fotoAuto', auto.foto);

    auto.foto = null;

    formData.append('richiesta',new Blob([JSON.stringify(auto)], {
      type: "application/json"
    }));

    console.log(formData);

      return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/createAuto/", formData).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

}
