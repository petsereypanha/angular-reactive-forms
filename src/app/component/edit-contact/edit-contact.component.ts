import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ContactsService} from '../contacts/contacts.service';
import {addressTypes, phoneTypes} from '../contacts/contact.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  phoneTypes = phoneTypes;
  addressTypes = addressTypes;
  contactForm = this.fb.nonNullable.group({
    id : '',
    personal : false,
    firstName : '',
    lastName : '',
    dateOfBirth : <Date | null> null,
    favoritesRanking : <number | null> null,
    phone : this.fb.nonNullable.group({
      phoneNumber : '',
      phoneType : '',
    }),
    address : this.fb.nonNullable.group({
      streetAddress : '',
      city : '',
      state : '',
      postalCode : '',
      addressType : '',
    }),
    notes : '',
  });

  constructor() {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      this.contactForm.setValue(contact);
      console.info(this.contactForm.controls.dateOfBirth.value);
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }

}
