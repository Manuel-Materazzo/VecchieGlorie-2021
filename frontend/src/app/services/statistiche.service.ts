import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {Persona} from "../Objects/persona";
import {Auto} from "../Objects/auto";
import {Tessera} from "../Objects/tessera";

@Injectable({ providedIn: 'root' })
export class StatisticheService {

  constructor(private api: ApiService) { }

  getStats(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getStatistiche", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

}
