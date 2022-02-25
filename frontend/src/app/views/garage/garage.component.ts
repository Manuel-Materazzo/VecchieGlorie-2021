import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Auto} from "../../Objects/auto";
import {GarageService} from "../../services/garage.service";
import {ToastService} from "../../services/toast.service";
import {BsDatepickerConfig, BsDatepickerViewMode} from "ngx-bootstrap/datepicker";
import {ActivatedRoute} from "@angular/router";
import {Persona} from "../../Objects/persona";
import {PersoneService} from "../../services/persone.service";

@Component({
  templateUrl: 'garage.component.html',
  styleUrls: ['garage.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, PersoneService, GarageService, ToastService]
})
export class GarageComponent implements OnInit {

  showDialog: boolean;

  autos: Auto[];

  auto: Auto;

  persone: Persona[];

  codFisc: string;

  autoSelezionate: Auto[];

  submitted: boolean;

  statuses: any[];

  bsConfig: Partial<BsDatepickerConfig>;

  imageSrc: string | ArrayBuffer;

  events: any[];

  options: any;

  codfiscEsrr: boolean = false;

  certificazioneErr: boolean = false;

  showImageDialog: boolean = false;

  imageUrl: string;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private garageService: GarageService, private toastService: ToastService, private route: ActivatedRoute,
              private personeService: PersoneService) {


    this.refreshAuto();

    this.route.queryParams.subscribe((params) => {
      this.showDialog = params.new;
      this.auto = {};
      this.codFisc = "";
      this.submitted = false;
    });

    let minMode: BsDatepickerViewMode = 'year';

    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'YYYY',
      minMode: minMode
    });

  }

  ngOnInit() {
  }

  openNew() {
    this.auto = {};
    this.codFisc = "";
    this.submitted = false;
    this.showDialog = true;
  }


  //quando clicco "elimina" dopo aver fatto una multiselezione
  deleteSelectedAuto() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare questi elementi?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let listaID: string[] = [];
        let autoLista = this.autoSelezionate;

        for (let i = 0; i < this.autoSelezionate.length; i++) {
          listaID.push(this.autoSelezionate[i].n_telaio);
        }

        this.garageService.deleteListaAuto(listaID).subscribe(
          (response: any) => {
            this.autos = this.autos.filter(val => !autoLista.includes(val));
            this.toastService.SuccessToast("Eliminato con successo");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.autoSelezionate = null;
      }
    });
  }

  //quando apro la finestra di edit
  editAuto(auto: Auto) {
    this.auto = {...auto};
    this.showDialog = true;
  }

  //quando clicco il cestino di fianco all'auto
  deleteAuto(auto: Auto) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare ' + auto.marca + ' ' + auto.modello + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.garageService.deleteAuto(auto.n_telaio).subscribe(
          (response: any) => {
            this.autos = this.autos.filter(val => val.n_telaio !== auto.n_telaio);
            this.toastService.SuccessToast("Auto Eliminata");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.auto = {};
        this.codFisc = "";
        this.autoSelezionate = [];
      }
    });
  }

  //quando i popup vengono chiusi
  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }

  imgClick(url){
    this.imageUrl = url;
    this.showImageDialog = true;
  }

//quando premo il pulsante ok della creazione di un'auto o della sua modifica
  saveAuto() {
    this.submitted = true;


    //se non ha un'id proprietario (sto creando un'auto, ho solo il codice fiscale) e non ha la foto il form non è completo
    if (this.auto.idPersona == null && this.auto.foto == null) {
      return;
    }

    //controlli per i null (quando faccio il create )
    if (this.auto.n_telaio == null || this.auto.marca == null || this.auto.modello == null || this.auto.anno_immatricolazione == null) {
      return;
    }

    //controllo se cancella cose nell'update e nel create dopo averle scritte
    if (this.auto.n_telaio == "" || this.auto.marca == "" || this.auto.modello == "") {
      return;
    }

    if(this.auto.cod_certificazione != null && isNaN(+this.auto.cod_certificazione)){
      this.certificazioneErr = true;
      return;
    }
    this.certificazioneErr = false; //se passa il controllo l'errore deve sparire

    if(this.auto.idPersona == null) {
      this.auto.idPersona = this.findpersonaIdByCodFisc(this.codFisc);
    }

    //se non trova il codice fiscale nella lista di soci e visitatori
    if(this.auto.idPersona == null || (this.codFisc.length > 0 && this.codFisc.length != 16)){
      this.codfiscEsrr = true;
      return;
    }
    this.codfiscEsrr = false; //se passa il controllo l'errore deve sparire

    //se sto facendo un'update di un'auto
    if (this.findIndexById(this.auto.n_telaio) != -1) {
      this.garageService.updateAuto(this.auto.n_telaio, this.auto).subscribe(
        (response) => {

          this.refreshAuto();

          this.toastService.SuccessToast("Auto Aggiornata");

        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );

      //altrimenti ne sto creando una nuova
    } else {
      this.garageService.createAuto(this.auto).subscribe(
        (response) => {

          this.refreshAuto();

          this.toastService.SuccessToast("Auto Creata");
        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      )
    }

    this.autos = [...this.autos];
    this.showDialog = false;
    this.auto = {};
    this.codFisc = "";
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.autos.length; i++) {
      if (this.autos[i].n_telaio === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findpersonaIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.persone.length; i++) {
      if (this.persone[i].idPersona === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findpersonaIdByCodFisc(codFisc: string): number {
    for (let i = 0; i < this.persone.length; i++) {
      if (this.persone[i].cod_fiscale === codFisc) {
        return this.persone[i].idPersona;
      }
    }
    return null;
  }

  refreshAuto() {

    this.personeService.getAllPersone().subscribe((response: any) => {
        this.persone = response;
      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );

    this.garageService.getAllAuto().subscribe((response: any) => {
        this.autos = response;
      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );

  }

  handleImages(Event) {
    this.auto.foto = Event[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(Event[0]);
  }

}
