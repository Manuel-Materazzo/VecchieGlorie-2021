import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Tessera} from '../../Objects/tessera';
import {TessereService} from '../../services/tessere.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRoute} from '@angular/router';
import {BsDatepickerConfig, BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {PersoneService} from '../../services/persone.service';
import {Persona} from '../../Objects/persona';

@Component({
  templateUrl: 'tessere.component.html',
  styleUrls: ['tessere.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, TessereService, ToastService]
})
export class TessereComponent implements OnInit {

  showDialog: boolean;

  tessere: Tessera[];

  tessera: Tessera;

  persone: Persona[];

  submitted: boolean;

  statuses: any[];

  bsConfig: Partial<BsDatepickerConfig>;

  minMode: BsDatepickerViewMode = 'year';

  socioCodiceFiscale: string;

  codfiscErr: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private tessereService: TessereService, private toastService: ToastService, private route: ActivatedRoute,
              private personeService: PersoneService) {

    this.refreshPersone();

    this.refreshTessera();

    this.route.queryParams.subscribe((params) => {
      this.showDialog = params.new;
      this.tessera = {};
      this.submitted = false;
    });

    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'YYYY',
      minMode: this.minMode
    });

  }

  ngOnInit() {
  }

  openNew() {
    this.tessera = {};
    this.socioCodiceFiscale = '';
    this.submitted = false;
    this.showDialog = true;
  }

  //quando apro la finestra di edit
  editTessera(tessera: Tessera) {
    this.tessera = {...tessera};
    this.showDialog = true;
  }

  //quando i popup vengono chiusi
  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.socioCodiceFiscale = '';
  }

//quando premo il pulsante ok della creazione di una tessera o della sua modifica
  saveTessera() {
    this.submitted = true;

    //create, controllo la presenza del codice fiscale
    if (this.tessera.idPersona == null && (this.socioCodiceFiscale == null)) {
      return;
    }

    //controllo la validità deo codice fiscale
    if (!this.tessera.id_tessera && this.socioCodiceFiscale?.length != 16) {
      this.codfiscErr = true;
      return;
    }
    this.codfiscErr = false; //se passa il controllo l'errore deve sparire

    //common, controllo i campi obbligatori in caso di null
    if (this.tessera.inizio_abbonamento == null || this.tessera.data_creazione == null) {
      return;
    }

    //se sto facendo un'update di una tessera
    if (this.tessera.id_tessera) {
      this.tessereService.updateTessera(this.tessera.id_tessera, this.tessera).subscribe(
        (response: Tessera) => {

          this.refreshTessera();

          this.toastService.SuccessToast('Tessera Aggiornata');

        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );

      //altrimenti ne sto creando una nuova
    } else {

      this.tessera.idPersona = this.findIdPersonaByCodfisc(this.socioCodiceFiscale);

      this.tessereService.createTessera(this.tessera).subscribe(
        (response: Tessera) => {

          this.refreshTessera();

          this.toastService.SuccessToast('Tessera creata');
        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );
    }

    this.tessere = [...this.tessere];
    this.showDialog = false;
    this.tessera = {};
    this.socioCodiceFiscale = '';
  }

  renewTessera() {
    this.tessera.inizio_abbonamento = new Date();
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.tessere.length; i++) {
      if (this.tessere[i].id_tessera === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findIdPersonaByCodfisc(codFisc: string): number {

    for (let i = 0; i < this.persone.length; i++) {
      let persona = this.persone[i];
      if (persona.cod_fiscale == codFisc) {
        return persona.idPersona;
      }
    }

    return -1;
  }

  findPersonaNameById(id: number): string {

    let nome = 'Dettagli';

    this.persone.forEach((persona) => {
      if (persona.idPersona == id) {
        nome = 'Tessera di ' + persona.nome + ' ' + persona.cognome;
      }
    });
    return nome;
  }

  refreshTessera() {

    this.tessere = [];

    this.tessereService.getAllTessera().subscribe((response: any) => {

        this.tessere = response;

      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );
  }

  refreshPersone() {

    this.persone = [];

    this.personeService.getAllPersone().subscribe((response: any) => {

      this.persone = response;

    });

  }

}
