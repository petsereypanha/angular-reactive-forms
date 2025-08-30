import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileIconSelectorComponent} from '../../component/profile-icon-selector/profile-icon-selector.component';

@NgModule({
  declarations: [
    ProfileIconSelectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileIconSelectorComponent
  ]
})
export class ProfileIconSelectorModule { }
