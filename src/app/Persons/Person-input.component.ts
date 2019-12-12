import { Component } from '@angular/core';
import { PersonService } from './Persons.service';

@Component({
  selector: 'app-person-input',
  templateUrl: './Person-input.component.html',
  styleUrls: ['./Person-input.component.css']
})
export class PersonInputComponent {

  constructor(private perService: PersonService) {}
  enteredPerson: string;
  createPerson() {
    console.log('created a person ' + this.enteredPerson);
    this.perService.onPersonCreate(this.enteredPerson);
    this.enteredPerson = '';
  }
}
