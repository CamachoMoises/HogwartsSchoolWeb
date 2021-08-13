import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Character } from '../../../shared/models/character';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'a6s-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  private paginator!: MatPaginator;
  today = new Date();
  year = this.today.getFullYear();

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Character>;
  displayedColumns: string[] = ['name', 'patronus', 'yearOfBirth', 'image']
  characters!: Character[];
  selected: boolean = false;
  houses: house[] = [
    { value: 'slytherin', viewValue: 'slytherin' },
    { value: 'gryffindor', viewValue: 'gryffindor' },
    { value: 'ravenclaw ', viewValue: 'ravenclaw ' },
    { value: 'hufflepuff ', viewValue: 'hufflepuff ' }
  ];
  constructor(private dataService: DataService) {
    super()
  }
  character$ = this.dataService.character$;
  ngOnInit(): void {
    this.subs.sink = this.character$.subscribe(data => {
      this.characters = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  onChange(house: string): void {
    this.selected = true;
    console.log('Value', house);
    this.dataService.getHouseCharacters(house);

  }

}
interface house {
  value: string;
  viewValue: string;
}
