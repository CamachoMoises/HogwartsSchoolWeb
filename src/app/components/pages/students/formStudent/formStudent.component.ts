import { Component, OnInit , Inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataService } from '../../../../shared/services/data.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'a6s-formStudent',
  templateUrl: './formStudent.component.html',
  styleUrls: ['./formStudent.component.scss']
})
export class FormStudentComponent implements OnInit {
  action: string='';
  tableForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,

  ) {
    this.tableForm= this.createContactForm();
   }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
  }
  //metodo para pasar los errores de validaciones
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  //creando los campos del formulario
  createContactForm(): FormGroup {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const reg2 = '^[0-9]{3,4}$'
    return this.fb.group({
    name:[null, Validators.required],
    patronus:[null, Validators.required],
    yearOfBirth:[null, [Validators.required, Validators.pattern(reg2)]],
    image:[null, Validators.pattern(reg)],
    });
  }
  //metodo para cerrar el componente
  onNoClick(res: number): void {
    this.dialogRef.close(res);
  }
  submit() {
    // emppty stuff
  }
  //metodo para cargar los datos de formulario
  confirmAdd():void{
    console.log('create');
    console.log(this.tableForm.value);
    this.dataService.addStudent(this.tableForm.value)
    this.onNoClick(1);
  }

}
