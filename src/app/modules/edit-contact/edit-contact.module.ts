import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditContactComponent} from '../../component/edit-contact/edit-contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EditContactComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditContactComponent
  ]
})
export class EditContactModule { }
