import { Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../../../shared/models/character';
import { DataService } from '../../../shared/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { FormStudentComponent } from './formStudent/formStudent.component'

@Component({
  selector: 'a6s-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  private paginator!: MatPaginator;
  today = new Date();
  year = this.today.getFullYear();
  displayedColumns: string[] = ['name', 'patronus', 'yearOfBirth', 'image']
  students!: Character[];
  selected: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Character>;
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
  ) {
    super();
  }
  character$ = this.dataService.student$;
  ngOnInit(): void {
    this.dataService.getStudentCharacter();
    this.subs.sink = this.character$.subscribe(data => {
      this.students = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  addStudent(): void {
    const DialogRef = this.dialog.open(FormStudentComponent,{
      width:'500px',
      data:{
        action:'add'
      }
    });
    this.subs.sink = DialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        console.log('close');
      }
    });
  }

}
