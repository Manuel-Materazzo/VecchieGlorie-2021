import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SociComponent } from './soci.component';
import {TableModule} from 'primeng/table';
import { SociRoutingModule } from './soci-routing.module';

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
import {FileUploadModule} from "primeng/fileupload";
import {NgxFilesizeModule} from "ngx-filesize";

@NgModule({
  imports: [
    FormsModule,
    SociRoutingModule,
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
    FileUploadModule,
    NgxFilesizeModule
  ],
  declarations: [
    SociComponent
  ]
})
export class SociModule { }
