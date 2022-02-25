import {Component, OnInit} from '@angular/core';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Statistiche} from "../../Objects/statistiche";
import {MessageService} from "primeng/api";
import {ToastService} from "../../services/toast.service";
import {StatisticheService} from "../../services/statistiche.service";

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [MessageService, StatisticheService, ToastService]
})

export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';

  lastYear: string;

  currentYear: string;

  statistiche: Statistiche;

  lastYearOptions: any;

  thisYearOptions: any;

  lastYearData: Array<any>;

  thisYearData: Array<any>;

  public mesi: Array<any> = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio',
    'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  public thisYearColours: Array<any> = [{
    backgroundColor: 'rgba(211,72,54,0)',
    borderColor: 'rgba(255,255,255,.55)'
  }];

  public lastYearColours: Array<any> = [{
    backgroundColor: 'rgba(59,89,152,1)',
    borderColor: 'rgba(255,255,255,.55)'
  }];

  constructor(private messageService: MessageService, private statsService: StatisticheService, private toastService: ToastService) {

    statsService.getStats().subscribe(
      (response: Statistiche) => {

        this.statistiche = response;

        this.currentYear = new Date().getFullYear().toString();

        this.lastYear = (new Date().getFullYear() - 1).toString();

        this.thisYearData = [{ data: response.nuoviMembriPerMeseAnnoCorrente, label: 'Nuovi membri' }];

        this.lastYearData = [{ data: response.nuoviMembriPerMeseAnnoPrecedente, label: 'Nuovi membri' }];

        this.thisYearOptions = {
          tooltips: {enabled: false, custom: CustomTooltips},
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ gridLines: {color: 'transparent', zeroLineColor: 'transparent'}, ticks: {fontSize: 2, fontColor: 'transparent'} }],
            yAxes: [{display: false, ticks: {display: false, min: 0, max: this.getbiggest(response.nuoviMembriPerMeseAnnoCorrente)}}],
          },
          elements: {
            line: {borderWidth: 1},
            point: {radius: 4, hitRadius: 10, hoverRadius: 4},
          },
          legend: {display: false}
        };

        this.lastYearOptions = {
          tooltips: {enabled: false, custom: CustomTooltips},
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ gridLines: {color: 'transparent', zeroLineColor: 'transparent'}, ticks: {fontSize: 2, fontColor: 'transparent'} }],
            yAxes: [{display: false, ticks: {display: false, min: 0, max: this.getbiggest(response.nuoviMembriPerMeseAnnoPrecedente)}}],
          },
          elements: {
            line: {borderWidth: 1},
            point: {radius: 4, hitRadius: 10, hoverRadius: 4},
          },
          legend: {display: false}
        };


      }, (error) => {
        console.log(error);
        this.toastService.WarnToast('Bravo Six, going dark.',
          'Sembra che il server non sia raggiungibile, prova ad aspettare qualche minuto');
      }
    );

  }

  ngOnInit() {
  }

  getbiggest(numeri: number[]) {

    let buggestNumber = 0;

    numeri.forEach((numero) => {
      if (numero > buggestNumber) {
        buggestNumber = numero;
      }
    });

    return buggestNumber + (buggestNumber/100*10);
  }
}
