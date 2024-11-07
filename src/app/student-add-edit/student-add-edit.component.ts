import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {

  studentForm: FormGroup;


  constructor(
    private _fb: FormBuilder,   
    private studentService: StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  )
    {
    this.studentForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
    });
  }
  ngOnInit(): void {
      this.studentForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.studentForm.valid){
      if(this.data){
        this.studentService.updateStudent(this.data.id,this.studentForm.value).subscribe({
          next: (val: any)=>{
            alert('Student record updated successfully!!')
            this._dialogRef.close(true);
          },
          error: (err: any)=>{
            console.error(err)
          },
        });
      }else{
        this.studentService.addStudent(this.studentForm.value).subscribe({
          // if this is success then should, it been added
          next: (val: any)=>{
            alert('Student record added successfully!!')
            this._dialogRef.close(true);
          },
          error: (err: any)=>{
            console.error(err)
          },
        });
      }
    }
  }
}
