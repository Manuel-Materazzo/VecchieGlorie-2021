import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {Partecipante} from "../Objects/partecipante";
import {Manifestazione} from "../Objects/manifestazione";

@Injectable({ providedIn: 'root' })
export class ManifestazioniService {

  constructor(private api: ApiService) { }

  getAllManifestazione(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllManifestazione/", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteManifestazione(id: number): Observable<any> {
    return this.api.ezDelete("http://localhost:8080/ClubAutoDEpoca/deleteManifestazioneById/" + id).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  updateManifestazione(id: number, manifestaione: Manifestazione): Observable<any> {
    return this.api.ezPut("http://localhost:8080/ClubAutoDEpoca/updateManifestazione/" + id, manifestaione).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  createManifestazione(manifestaione: Manifestazione): Observable<any> {
    console.log(manifestaione);
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/createManifestazione/", manifestaione).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  getPartecipazioniByIdManifestazione(id: number): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllPartecipazioniByIdManifestazione/"+ id, null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  getAllPartecipazioni(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllPartecipazioni/", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deletePartecipazioni(id: number): Observable<any> {
    return this.api.ezDelete("http://localhost:8080/ClubAutoDEpoca/deletePartecipazioniById/" + id).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteListaPartecipazioni(idList: number[]): Observable<any>{
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/deletePartecipazioniByListId/", idList).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  updatePartecipazioni(id: number, partecipazione: Partecipante): Observable<any> {
    return this.api.ezPut("http://localhost:8080/ClubAutoDEpoca/updatePartecipazioni/" + id, partecipazione).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  createPartecipazioni(partecipazione: Partecipante): Observable<any> {
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/createPartecipazioni/", partecipazione).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

}
