import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContactListModule} from './modules/contact-list/contact-list.module';
import {EditContactModule} from './modules/edit-contact/edit-contact.module';
import {ProfileIconSelectorModule} from './modules/profile-icon-selector/profile-icon-selector.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactListModule,
    EditContactModule,
    ProfileIconSelectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
