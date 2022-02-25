import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ManifestazioniComponent } from './manifestazioni.component';
import {TableModule} from 'primeng/table';
import { ManifestazioniRoutingModule } from './manifestazioni-routing.module';

import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {ToastModule} from "primeng/toast";
import {RatingModule} from "primeng/rating";
import { CommonModule } from '@angular/common';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {CheckboxModule} from "primeng/checkbox";
import {FullCalendarModule} from "primeng/fullcalendar";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
    imports: [
        FormsModule,
        ManifestazioniRoutingModule,
        ChartsModule,
        TableModule,
        BsDropdownModule,
        ButtonsModule.forRoot(),
        ButtonModule,
        RippleModule,
        ToolbarModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        InputNumberModule,
        ConfirmDialogModule,
        RadioButtonModule,
        ToastModule,
        CommonModule,
        RatingModule,
        BsDatepickerModule,
        CheckboxModule,
        FullCalendarModule,
        InputTextareaModule
    ],
  declarations: [
    ManifestazioniComponent
  ]
})
export class ManifestazioniModule { }
