import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactListComponent} from '../../component/contact-list/contact-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ContactListComponent
  ]
})
export class ContactListModule { }
