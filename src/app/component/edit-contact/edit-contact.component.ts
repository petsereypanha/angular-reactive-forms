import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ContactsService} from '../contacts/contacts.service';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.nonNullable.group({
      id : '',
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
    });
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      this.contactForm.setValue(contact);
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }
}
