import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";


@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private messageService: MessageService) { }


  GenericErrorToast(){
    this.messageService.add({
      severity: 'error',
      summary: 'Uh oh...',
      detail: 'Qualcosa è andato storto, prova a ricaricare la pagina',
      life: 3000
    });
  }

  SuccessToast(message: string){
    this.messageService.add({
      severity: 'success',
      summary: 'Un successo!',
      detail: message,
      life: 3000
    });
  }

  WarnToast(title: string, message: string){
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 10000
    });
  }

  ErrorToast(title: string, message: string){
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 3000
    });
  }

}
