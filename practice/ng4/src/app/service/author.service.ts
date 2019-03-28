import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
name='王花花';
age=18
greeting(){
  return `Yo,我叫${this.name}`;
}
  constructor() { }
}
