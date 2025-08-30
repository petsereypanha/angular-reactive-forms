export interface Contact {
  id: string,
  personal: boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: string |Date | null ,
  favoritesRanking: number | null,
  phone: Phone,
  address: Address,
  notes: string,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypes = [
  { value: 'mobile', title: 'Mobile' },
  { value: 'work', title: 'Work' },
  { value: 'other', title: 'Other' },
]

export const addressTypes = [
  { value: 'home', title: 'Home' },
  { value: 'work', title: 'Work' },
  { value: 'other', title: 'Other' },
]
