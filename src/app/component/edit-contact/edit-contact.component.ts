import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ContactsService} from '../contacts/contacts.service';
import {addressTypes, phoneTypes} from '../contacts/contact.model';
import {restrictedWords} from '../../validators/restricted-words.validator';
import {debounceTime, distinctUntilChanged} from 'rxjs';

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
    phones : this.fb.array([this.createPhoneGroup()]),
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
    if (!contactId) {
      this.subscribeToFormChanges();
      return;
    }
    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;
      for (let i = 1; i < contact.phones.length; i++) {
        this.addPhone();
      }
      this.contactForm.setValue(contact);
      this.subscribeToFormChanges();
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }

  addPhone(){
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  createPhoneGroup() {
    const phoneGroup =  this.fb.nonNullable.group({
      phoneNumber : '',
      phoneType : '',
      preferred : false,
    })
    phoneGroup.controls.preferred.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe(value => {
      if (value) {
        phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
      } else {
        phoneGroup.controls.phoneNumber.removeValidators([Validators.required]);
      }
      phoneGroup.controls.phoneNumber.updateValueAndValidity();
    })
    return phoneGroup;
  }

  stringifyCompare(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  subscribeToFormChanges() {
    const addressGroup = this.contactForm.controls.address;
    addressGroup.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlKey in addressGroup.controls) {
          addressGroup.get(controlKey)?.removeValidators([Validators.required]);
          addressGroup.get(controlKey)?.updateValueAndValidity();
        }
      });
    addressGroup.valueChanges
      .pipe(debounceTime(2000) ,distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlKey in addressGroup.controls) {
          addressGroup.get(controlKey)?.addValidators([Validators.required]);
          addressGroup.get(controlKey)?.updateValueAndValidity();
        }
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
