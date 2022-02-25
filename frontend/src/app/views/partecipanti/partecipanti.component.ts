import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Partecipante} from "../../Objects/partecipante";
import {ToastService} from "../../services/toast.service";
import {ManifestazioniService} from "../../services/manifestazioni.service";
import {ActivatedRoute} from "@angular/router";
import {Manifestazione} from "../../Objects/manifestazione";
import {GarageService} from "../../services/garage.service";
import {Auto} from "../../Objects/auto";

@Component({
  templateUrl: 'partecipanti.component.html',
  styleUrls: ['partecipanti.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, ManifestazioniService, ToastService]
})
export class PartecipantiComponent implements OnInit {

  showDialog: boolean;

  partecipanti: Partecipante[];

  partecipante: Partecipante;

  partecipantiSelezionati: Partecipante[];

  manifestazioni: Manifestazione[];

  listaAuto: Auto[];

  submitted: boolean;

  partecipa: boolean;

  statuses: any[];

  queryParams: string;

  erroreManifestazione: boolean = false;

  erroreTelaio: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private manifestazioniService: ManifestazioniService, private toastService: ToastService,
              private route: ActivatedRoute, private garageService: GarageService) {

    this.route.queryParams.subscribe((params) => {
      this.showDialog = params.new;
      this.partecipante = {};
      this.submitted = false;
      this.refreshPartecipazioni(params.idManifestazione);
      this.queryParams = params.idManifestazione;
    });

    this.refreshManifestazioni();

    this.refreshGarage();

  }

  ngOnInit() {
  }

  openNew() {
    this.partecipante = {};
    this.submitted = false;
    this.showDialog = true;
    this.partecipa = false;
  }

  //quando clicco "elimina" dopo aver fatto una multiselezione
  deleteSelectedPartecipazioni() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare questi elementi?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let listaID: number[] = [];
        for (let i = 0; i < this.partecipantiSelezionati.length; i++) {
          listaID.push(this.partecipantiSelezionati[i].id_partecipazione);
        }

        this.manifestazioniService.deleteListaPartecipazioni(listaID).subscribe(
          (response: any) => {
            this.partecipanti = this.partecipanti.filter(val => !this.partecipantiSelezionati.includes(val));
            this.toastService.SuccessToast("Eliminato con successo");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.partecipantiSelezionati = null;
      }
    });
  }


  //quando apro la finestra di edit
  editPartecipazioni(partecipazione: Partecipante) {
    this.partecipante = {...partecipazione};
    this.showDialog = true;
    this.partecipa = partecipazione.partecipa;
  }


  //quando clicco il cestino di fianco alla partecipazione
  deletePartecipazioni(partecipazione: Partecipante) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare la partecipazione ' + partecipazione.id_partecipazione +
        " alla manifestazione " + partecipazione.id_manifestazione + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.sociService.deleteListaPersona([...persona.id]).subscribe(
        this.manifestazioniService.deletePartecipazioni(partecipazione.id_partecipazione).subscribe(
          (response: any) => {
            this.partecipanti = this.partecipanti.filter(val => val.id_partecipazione !== partecipazione.id_partecipazione);
            this.toastService.SuccessToast("Partecipazione Eliminata");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.partecipante = {};
        this.partecipantiSelezionati = [];
      }
    });
  }

  //quando i popup vengono chiusi
  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.partecipa = false;
  }


//quando premo il pulsante ok della creazione di un partecipante o della sua modifica
  savePartecipazione() {
    this.submitted = true;

    //campi presenti perchè il form sia valido
    if (!(this.partecipante.id_manifestazione && this.partecipante.n_telaio && this.partecipante.numero_persone &&
      this.partecipante.quota_versata)) {
      return;
    }

    if(!this.manifestazioneEsiste(this.partecipante.id_manifestazione)){
      this.erroreManifestazione = true;
      return;
    }
    this.erroreManifestazione = false; //se passa il controllo l'errore deve sparire


    if(!this.nTelaioEsiste(this.partecipante.n_telaio)){
      this.erroreTelaio = true;
      return;
    }
    this.erroreTelaio = false; //se passa il controllo l'errore deve sparire

    if (this.partecipante.partecipa == null) {
      this.partecipante.partecipa = false;
    }

    //se sto facendo un'update di un partecipante
    if (this.partecipante.id_partecipazione) {
      this.manifestazioniService.updatePartecipazioni(this.partecipante.id_partecipazione, this.partecipante).subscribe(
        (response) => {
          this.refreshPartecipazioni(this.queryParams);

          this.toastService.SuccessToast("Partecipazione Aggiornata");

        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );

      //altrimenti ne sto creando uno nuovo
    } else {

      this.manifestazioniService.createPartecipazioni(this.partecipante).subscribe(
        (response) => {

          this.refreshPartecipazioni(this.queryParams);

          this.toastService.SuccessToast("Partecipazione Creata");
        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );
    }

    this.partecipanti = [...this.partecipanti];
    this.showDialog = false;
    this.partecipante = {};
    this.partecipa = false;
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.partecipanti.length; i++) {
      if (this.partecipanti[i].id_partecipazione === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findCostoPersona(id_manifestazione: number): number {

    let costoPersona = 0;

    for (let i = 0; i < this.manifestazioni.length; i++) {
      let manifestazione = this.manifestazioni[i];
      if (manifestazione.id_manifestazione == id_manifestazione) {
        costoPersona = manifestazione.costo_a_persona;
        break;
      }
    }

    return costoPersona;
  }

  manifestazioneEsiste(id_manifestazione: number): boolean{

    let trovato = false;

    for(let i = 0; i < this.manifestazioni.length; i++){
      let manifestazione = this.manifestazioni[i];
      if(manifestazione.id_manifestazione ==  id_manifestazione){
        trovato = true;
        break;
      }
    }

    return trovato;
  }

  nTelaioEsiste(n_telaio: string): boolean{

    let trovato = false;

    for(let i = 0; i < this.listaAuto.length; i++){
      let auto = this.listaAuto[i];
      if(auto.n_telaio ==  n_telaio){
        trovato = true;
        break;
      }
    }

    return trovato;
  }

  refreshPartecipazioni(id: string) {
    if (id) {

      this.manifestazioniService.getPartecipazioniByIdManifestazione(parseInt(id)).subscribe((response: any) => {
          this.partecipanti = response;
        }, (error) => {
          console.log(error);
          this.toastService.WarnToast('Bravo Six, going dark.',
            'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
        }
      );

    } else {

      this.manifestazioniService.getAllPartecipazioni().subscribe((response: any) => {
          this.partecipanti = response;
        }, (error) => {
          console.log(error);
          this.toastService.WarnToast('Bravo Six, going dark.',
            'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
        }
      );
    }
  }

  refreshManifestazioni() {
    this.manifestazioniService.getAllManifestazione().subscribe((response: any) => {
        this.manifestazioni = response;
      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );
  }

  refreshGarage(){
    this.garageService.getAllAuto().subscribe((response: any) => {
        this.listaAuto = response;
      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );
  }

}
