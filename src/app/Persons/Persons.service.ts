import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personChanged = new Subject<string[]>();
  public persons: string[] = [];

  constructor(public httpMod: HttpClient) {}

  fetchPersons() {
    this.httpMod.get<any>('https://swapi.co/api/people/').pipe(map(data => {
    return data.results.map(character => character.name);
    })).subscribe((transfomedData) => {
      this.personChanged.next(transfomedData);
    });
  }

  onPersonCreate(name: string) {
    this.persons.push(name);
    this.personChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => {
      return person !== name;
    });
    this.personChanged.next(this.persons);
  }
}
