import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ContactsService} from '../contacts/contacts.service';
import {addressTypes, phoneTypes} from '../contacts/contact.model';
import {restrictedWords} from '../../validators/restricted-words.validator';

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
    icon: '',
    firstName : ['', [Validators.required, Validators.minLength(4)]],
    lastName : ['', [Validators.required, Validators.minLength(4)]],
    dateOfBirth : <Date | null> null,
    favoritesRanking : <number | null> null,
    phone : this.fb.nonNullable.group({
      phoneNumber : '',
      phoneType : '',
    }),
    address : this.fb.nonNullable.group({
      streetAddress : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required],
      postalCode : ['', Validators.required],
      addressType : ['', Validators.required],
    }),
    notes : ['',restrictedWords(['foo','bar'])],
  });

  constructor() {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      this.contactForm.setValue(contact);
      console.info(this.contactForm.controls.icon.value);
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }
  get lastName() {
    return this.contactForm.controls.lastName;
  }
  get address() {
    return this.contactForm.controls.address;
  }
  get notes() {
    return this.contactForm.controls.notes;
  }
}
