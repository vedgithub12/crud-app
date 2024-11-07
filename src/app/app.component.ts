import { Component, OnInit } from '@angular/core';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  title = 'angular-crud-app-master';

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStudentForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val) {
          this.getStudentList();
        }
      }
    })
  }

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next: (res) => {
        this.dataSource =  new MatTableDataSource(res);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteStudent(id: number){
    this._studentService.deleteStudent(id).subscribe({
      next: (res)=>{
        alert("Student record deleted!!")
        this.getStudentList();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  openEditForm(data: any) {
   const dialogRef = this._dialog.open(StudentAddEditComponent,{
    data,
   });

   dialogRef.afterClosed().subscribe({
    next: (val)=>{
      if(val) {
        this.getStudentList();
      }
    }
  })
  }
}
