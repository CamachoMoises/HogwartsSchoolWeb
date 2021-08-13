import { Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../../../shared/models/character';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'a6s-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  private paginator!: MatPaginator;
  today = new Date();
  year = this.today.getFullYear();
  displayedColumns: string[] = ['name','patronus','yearOfBirth', 'image' ]
  characters!: Character[];
  selected: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.dataSource.paginator = this.paginator;
}
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Character>;
  constructor(private dataService: DataService) {
    super();
   }
  character$ = this.dataService.character$;
  ngOnInit(): void {
    this.dataService.getStaffCharacters();
    this.subs.sink = this.character$.subscribe(data => {
      this.characters = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
