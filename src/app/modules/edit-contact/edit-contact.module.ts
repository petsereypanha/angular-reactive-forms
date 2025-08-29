import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditContactComponent} from '../../component/edit-contact/edit-contact.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    EditContactComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EditContactModule { }
