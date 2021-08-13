import { Component, OnInit , Inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'a6s-formStudent',
  templateUrl: './formStudent.component.html',
  styleUrls: ['./formStudent.component.scss']
})
export class FormStudentComponent implements OnInit {
  action: string='';
  tableForm!: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {

   }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({

    });
  }
  onNoClick(res: number): void {
    this.dialogRef.close(res);
  }

}
