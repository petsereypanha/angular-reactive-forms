import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditContactComponent} from '../../component/edit-contact/edit-contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePickerFormatDirective} from '../../component/edit-contact/date-picker-format.directive';
import {ProfileIconSelectorModule} from '../profile-icon-selector/profile-icon-selector.module';

@NgModule({
  declarations: [
    EditContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerFormatDirective,
    ProfileIconSelectorModule
  ],
  exports: [
    EditContactComponent
  ]
})
export class EditContactModule { }
