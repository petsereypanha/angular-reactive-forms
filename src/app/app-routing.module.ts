import {importProvidersFrom, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditContactComponent} from './component/edit-contact/edit-contact.component';
import {ContactListComponent} from './component/contact-list/contact-list.component';
import {provideHttpClient} from '@angular/common/http';
import {InMemoryContactsApi} from './component/contacts/in-memory-contacts.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

export const routes: Routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    title: 'Contacts'
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent,
    title: 'Contacts - Edit'
  },
  {
    path: 'contacts/edit',
    component: EditContactComponent,
    title: 'Contacts - Edit'
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideHttpClient(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 0 }))
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
