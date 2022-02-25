import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import {Persona} from "../Objects/persona";
import {Auto} from "../Objects/auto";
import {Tessera} from "../Objects/tessera";

@Injectable({ providedIn: 'root' })
export class PersoneService {

  constructor(private api: ApiService) { }

  getAllPersone(): Observable<any> {
    return this.api.get("http://localhost:8080/ClubAutoDEpoca/getAllPersona", null).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deletePersona(id: number): Observable<any> {
    return this.api.ezDelete("http://localhost:8080/ClubAutoDEpoca/deletePersonaById/" + id).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  deleteListaPersona(idList: number[]): Observable<any>{
    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/deletePersonaByListId/", idList).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  updatePersona(id: number, persona: Persona): Observable<any> {
    return this.api.ezPut("http://localhost:8080/ClubAutoDEpoca/updatePersona/" + id, persona).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }

  createPersona(persona: Persona, auto: Auto, tessera: Tessera): Observable<any> {

    let dataOdierna = null;

    if(tessera.inizio_abbonamento){
      dataOdierna = new Date();
    }

    let richiesta = {
      "nome": persona.nome,
      "cognome": persona.cognome,
      "data_nascita": persona.data_nascita,
      "cod_fiscale": persona.cod_fiscale,
      "n_telefono": persona.n_telefono,
      "consiglio": persona.consiglio,
      "mail": persona.mail,
      "tesseraDTO": {
        "data_creazione": dataOdierna,
        "inizio_abbonamento": tessera.inizio_abbonamento,
      },
      "autoDTOset": [
        {
          "n_telaio": auto.n_telaio,
          "marca": auto.marca,
          "modello": auto.modello,
          "anno_immatricolazione": auto.anno_immatricolazione,
          "cod_certificazione": auto.cod_certificazione,
        }
      ]
    };

    console.log(richiesta);

    const formData :FormData = new FormData();

    formData.append('fotoAuto', auto.foto);
    formData.append('richiesta',new Blob([JSON.stringify(richiesta)], {
      type: "application/json"
    }));

    console.log(formData);

    return this.api.ezPost("http://localhost:8080/ClubAutoDEpoca/createPersona/", formData).pipe(
      map((res: any) => {
        if (res) {
          return res;
        }
        return null;
      }));
  }


}
