import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Persona} from "../../Objects/persona";
import {PersoneService} from "../../services/persone.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute} from "@angular/router";
import {Auto} from "../../Objects/auto";
import {BsDatepickerConfig, BsDatepickerViewMode} from "ngx-bootstrap/datepicker";
import {Tessera} from "../../Objects/tessera";

@Component({
  templateUrl: 'soci.component.html',
  styleUrls: ['soci.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, PersoneService, ToastService]
})
export class SociComponent implements OnInit, AfterViewInit {

  showDialog: boolean;

  showAutoDialog: boolean;

  persone: Persona[];

  persona: Persona;

  auto: Auto;

  tessera: Tessera;

  personeSelezionate: Persona[];

  submitted: boolean;

  submittedAuto: boolean;

  socio: boolean;

  statuses: any[];

  bsConfig: Partial<BsDatepickerConfig>;

  minMode: BsDatepickerViewMode = 'year';

  imageSrc: string | ArrayBuffer;

  loadedPage: boolean;

  telefonoErr:boolean = false;

  codfiscErr:boolean = false;

  certificazioneErr:boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private personeService: PersoneService, private toastService: ToastService, private route: ActivatedRoute) {


    this.auto = {};
    this.tessera = {};

    this.route.queryParams.subscribe((params) => {
      this.showDialog = params.new == "true";
      this.persona = {};
      this.socio = params.socio == "true";
      this.loadedPage = this.socio;
      this.refreshPersone();
      this.submitted = false;
      this.submittedAuto = false;
    });

    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'YYYY',
      minMode: this.minMode
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  openNew() {
    this.persona = {};
    this.tessera = {};
    this.auto = {};
    this.submitted = false;
    this.showDialog = true;
    this.showAutoDialog = false;
  }

  openNewAuto() {
    this.showAutoDialog = true;
  }

  deleteSelectedPersone() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare questi elementi?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let listaID: number[] = [];
        let personeList = this.personeSelezionate;

        for (let i = 0; i < this.personeSelezionate.length; i++) {
          listaID.push(this.personeSelezionate[i].idPersona);
        }

        this.personeService.deleteListaPersona(listaID).subscribe(
          (response: any) => {
            this.persone = this.persone.filter(val => !personeList.includes(val));
            this.toastService.SuccessToast("Eliminato con successo");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.personeSelezionate = null;
      }
    });
  }

  //quando apro la finestra di edit
  editPersona(persona: Persona) {
    this.persona = {...persona};
    this.showDialog = true;
    this.socio = persona.id_tessera != null;
  }

  deletePersona(persona: Persona) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare ' + persona.nome + ' ' + persona.cognome + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personeService.deletePersona(persona.idPersona).subscribe(
          (response: any) => {
            this.persone = this.persone.filter(val => val.idPersona !== persona.idPersona);
            this.toastService.SuccessToast("Membro Eliminato");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.persona = {};
        this.auto = {};
        this.tessera = {};
        this.personeSelezionate = [];
      }
    });
  }

  //quando i popup vengono chiusi
  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.submittedAuto = false;
  }

  hideAutoDialog() {
    this.showAutoDialog = false;
    this.submittedAuto = false;
  }

//quando premo il pulsante ok della creazione di un'socio o della sua modifica
  savePersona() {
    this.submitted = true;

    //se non ha un'id (sto creando una persona) e non ha le informazioni di tessera e auto il form non è completo
      if (this.persona.idPersona == null && (this.auto.n_telaio == null || (this.tessera.inizio_abbonamento == null && this.socio == true))) {
        return;
      }

    //controlli per i null (quando faccio il create )
    if (this.persona.nome == null || this.persona.cognome == null || this.persona.cod_fiscale == null || this.persona.data_nascita == null) {
      return;
    }

    //controllo se cancella cose nell'update e nel create dopo averle scritte
    if (this.persona.nome == "" || this.persona.cognome == "") {
      return;
    }

    //controllo se il codice fiscale è valido
    if(this.persona.cod_fiscale.length != 16){
      this.codfiscErr = true;
      return;
    }
    this.codfiscErr = false; //se passa il controllo l'errore deve sparire

    //controllo la validità del numero di telefono (controllo se è un numero valido e se ha 9 cifre)
    if((this.persona.n_telefono != null && isNaN(+this.persona.n_telefono)) &&
      this.persona.n_telefono.toString().length < 9){
      this.telefonoErr = true;
      return;
    }
    this.telefonoErr = false; //se passa il controllo l'errore deve sparire

    if (this.persona.consiglio == null) {
      this.persona.consiglio = false;
    }

    //caso in cui abbia messo i dati da socio e poi abbia spostato il check su visitatore
    if (!this.socio) {
      this.tessera = {};
      this.persona.consiglio = false;
      this.persona.id_tessera = null;
    }

    //se sto facendo un'update di una persona
    if (this.persona.idPersona) {


      this.personeService.updatePersona(this.persona.idPersona, this.persona).subscribe(
        (response: Persona) => {

          this.refreshPersone();

          this.toastService.SuccessToast("Membro Aggiornato");

        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );

      //altrimenti ne sto creando una nuova
    } else {

      this.personeService.createPersona(this.persona, this.auto, this.tessera).subscribe(
        (response: Persona) => {

          this.refreshPersone();

          this.toastService.SuccessToast("Membro Creato");
        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      )
    }

    this.persone = [...this.persone];
    this.showDialog = false;
    this.persona = {};
    this.auto = {};
    this.tessera = {};
  }

  saveAuto() {
    this.submittedAuto = true;
    if (!(this.auto.n_telaio && this.auto.modello && this.auto.marca && this.auto.anno_immatricolazione &&
      this.auto.foto)) {
      return;
    }

    if(this.auto.cod_certificazione != null && isNaN(+this.auto.cod_certificazione)){
      this.certificazioneErr = true;
      return;
    }

    this.showAutoDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.persone.length; i++) {
      if (this.persone[i].idPersona === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  handleImages(Event) {
    this.auto.foto = Event[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(Event[0]);
  }

  refreshPersone() {
    this.personeService.getAllPersone().subscribe((response: any[]) => {

        if (this.socio) {
          this.persone = response.filter((persona) => {
            return persona.id_tessera;
          });
        } else {
          this.persone = response.filter((persona) => {
            return !persona.id_tessera;
          });
        }

      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );
  }

}
