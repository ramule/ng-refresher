import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from './Persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-persons',
  templateUrl : './persons.component.html'

})
export class PersonsComponent implements OnInit, OnDestroy {
  personUnsubsc = new Subscription();
  personList: string[];

  constructor(private perService: PersonService) {
    // this.personList = perService.persons;
  }

  ngOnInit() {
    this.personUnsubsc = this.perService.personChanged.subscribe((data) => {
      this.personList = data;
    });
    this.perService.fetchPersons();
    this.personList = this.perService.persons;
  }

  removePerson(person: string) {
    this.perService.removePerson(person);
    this.personUnsubsc = this.perService.personChanged.subscribe((data) => {
      this.personList = data;
    });
  }

  ngOnDestroy() {
    this.personUnsubsc.unsubscribe();
  }
}
