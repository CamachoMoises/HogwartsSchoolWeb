import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../UnsubscribeOnDestroyAdapter';
import { Character } from "../models/character";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService extends UnsubscribeOnDestroyAdapter {
  private characterSubject = new BehaviorSubject<Character[]>([]);
  character$ = this.characterSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }
  private urlAPI = 'http://hp-api.herokuapp.com/api/characters';
  async getHouseCharacters(house: string): Promise<void> {
    this.subs.sink = await this.http.get<Character[]>(this.urlAPI + '/house/' + house).subscribe((data: Character[]) => {
      console.log(data);
      this.characterSubject.next(data);
    });
  }

}
