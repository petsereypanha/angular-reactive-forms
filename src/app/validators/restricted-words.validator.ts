import {AbstractControl, ValidationErrors} from '@angular/forms';

export function restrictedWords(words: string[]){
  return (control: AbstractControl): ValidationErrors | null =>{
    const invalid = words
      .map(w => control.value.includes(w) ? w : null)
      .filter(w => w != null);
    return invalid.length > 0 ?
      { restrictedWords: invalid.join(', ') } : null;
  }
}
