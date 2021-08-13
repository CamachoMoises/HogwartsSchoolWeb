import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../UnsubscribeOnDestroyAdapter';
import { Character } from "../models/character";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService extends UnsubscribeOnDestroyAdapter {
  students:Character[] =[];
  private characterSubject = new BehaviorSubject<Character[]>([]);
  private studentsSubject = new BehaviorSubject<Character[]>([]);
  student$ = this.studentsSubject.asObservable();
  character$ = this.characterSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }
  private urlAPI = 'http://hp-api.herokuapp.com/api/characters';

  //metdo asyncrono para traer los datos de los personajes por casa de hechicería
  async getHouseCharacters(house: string): Promise<void> {
    this.subs.sink = await this.http.get<Character[]>(this.urlAPI + '/house/' + house).subscribe((data: Character[]) => {
      console.log(data);
      this.characterSubject.next(data);
    });
  }
  async getStaffCharacters(): Promise<void> {
    this.subs.sink = await this.http.get<Character[]>(this.urlAPI + '/staff').subscribe((data: Character[]) => {
      console.log(data);
      this.characterSubject.next(data);
    });
  }
  async getStudentCharacter(): Promise<void> {
    this.subs.sink = await this.http.get<Character[]>(this.urlAPI + '/students').subscribe((data: Character[]) => {
      console.log(data);
      this.studentsSubject.next(this.students.concat(data));
    })
  }
  addStudent(student: Character): void {
    const students= this.studentsSubject.getValue();
    let studentAdd: Character[] = [];
    studentAdd.push(student)
    students.forEach(data => {
      studentAdd.push(data);
    })

    console.log(studentAdd);
    this.studentsSubject.next(studentAdd);
    this.students.push(student)
  }

}
