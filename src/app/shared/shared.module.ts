import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadCrumbComponent } from './componentes/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './componentes/page-header/page-header.component';
import { FormFieldErrorComponent } from './componentes/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './componentes/server-error-messages/server-error-messages.component';
import { CardDeckReportComponent } from './componentes/card-deck-report/card-deck-report.component';

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormFieldErrorComponent, ServerErrorMessagesComponent, CardDeckReportComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    CardDeckReportComponent
  ]
})
export class SharedModule { }
