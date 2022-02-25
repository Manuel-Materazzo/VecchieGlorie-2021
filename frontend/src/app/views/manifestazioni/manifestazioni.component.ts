import {Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Manifestazione} from "../../Objects/manifestazione";
import {ManifestazioniService} from "../../services/manifestazioni.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute} from "@angular/router";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendar} from "primeng/fullcalendar";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'manifestazioni.component.html',
  styleUrls: ['manifestazioni.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, ManifestazioniService, ToastService]
})
export class ManifestazioniComponent implements OnInit {

  @ViewChild('fc') private fc: FullCalendar;

  showDialog: boolean;

  manifestazioni: Manifestazione[];

  manifestazione: Manifestazione;

  submitted: boolean;

  statuses: any[];

  events: any[];

  options: any;

  editable: boolean;

  new:boolean;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private manifestazioniService: ManifestazioniService, private toastService: ToastService,
              private route: ActivatedRoute, private router: Router) {

    this.refreshManifestazioni();

    this.route.queryParams.subscribe((params) => {
      this.showDialog = params.new;
      this.editable = params.new;
      this.manifestazione = {};
      this.submitted = false;
    });

    this.options = {
      plugins: [dayGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'nuovo',
        center: 'title',
        right: 'prev,next'
      },
      customButtons: {
        nuovo: {
          text: '+ Nuovo',
          click: this.openNew.bind(this)
        }
      },
      eventClick: this.eventClickHandler.bind(this)
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fc.getCalendar().setOption('height', (window.innerHeight - (window.innerHeight / 5)));
    this.fc.getCalendar().setOption('locale', 'it');
    this.fc.getCalendar().setOption('firstDay', 1);
  }

  //quando clicco su un evento
  eventClickHandler(event) {
    let indice = this.findIndexById(event.event.id);
    this.manifestazione = {...this.manifestazioni[indice]};
    this.editable = false;
    this.showDialog = true;
  }

  openNew() {
    this.new = true;
    this.manifestazione = {};
    this.submitted = false;
    this.showDialog = true;
    this.editable = true;
  }

  //quando clicco il cestino di fianco alla manifestazione
  deleteManifestazione() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare ' + this.manifestazione.id_manifestazione + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.sociService.deleteListaManifestazione([...manifestazione.id]).subscribe(
        this.manifestazioniService.deleteManifestazione(this.manifestazione.id_manifestazione).subscribe(
          (response: any) => {
            this.refreshManifestazioni();
            this.toastService.SuccessToast("Manifestazione Eliminata");
          }, (error) => {
            console.log(error);
            this.toastService.GenericErrorToast();
          }
        );
        this.manifestazione = {};
        this.editable = false;
        this.showDialog = false;
      }
    });
  }

  //quando i popup vengono chiusi
  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.editable = false;
    this.new = false;
  }

//quando premo il pulsante ok della creazione di una manifestazione o della sua modifica
  saveManifestazione() {
    this.submitted = true;

    //controlli validità form
    if (!(this.manifestazione.data_fine && this.manifestazione.data_fine && this.manifestazione.costo_a_persona &&
      this.manifestazione.numero_massimo && this.manifestazione.programma)) {
      return;
    }

    //se sto facendo un'update di una manifestazione
    if (this.manifestazione.id_manifestazione) {
      this.manifestazioniService.updateManifestazione(this.manifestazione.id_manifestazione, this.manifestazione).subscribe(
        (response) => {

          this.refreshManifestazioni();

          this.toastService.SuccessToast("Manifestazione Aggiornata");
        }, (error: any) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      );

      //altrimenti ne sto creando una nuova
    } else {

      this.manifestazioniService.createManifestazione(this.manifestazione).subscribe(
        (response) => {

          this.refreshManifestazioni();

          this.toastService.SuccessToast("Manifestazione Creata");
        }, (error) => {
          console.log(error);
          this.toastService.GenericErrorToast();
        }
      )
    }

    this.editable = false;
    this.showDialog = false;
    this.new = false;
    this.manifestazione = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.manifestazioni.length; i++) {
      if (this.manifestazioni[i].id_manifestazione == id) {
        index = i;
        break;
      }
    }
    return index;
  }

  toPartecipanti(id: number){
    this.router.navigateByUrl('/partecipanti?idManifestazione=' + id);
  }

  refreshManifestazioni() {
    this.manifestazioniService.getAllManifestazione().subscribe((response: any) => {
        this.events = [];

        response.forEach((rispostaAttuale: Manifestazione) => {
          let evento = {
            "id": rispostaAttuale.id_manifestazione,
            "title": rispostaAttuale.programma,
            "start": rispostaAttuale.data_inizio,
            "end": rispostaAttuale.data_fine
          }
          this.events.push(evento);
        });
        this.events = [...this.events];
        this.manifestazioni = response;
      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );
  }

}
