import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private _http: HttpClient) { }

  // post request where the data goes to db.json file
  addStudent(data:any):Observable<any> {
    return this._http.post('http://localhost:3000/students', data)
  }

  updateStudent(id:number, data:any):Observable<any> {
    return this._http.put(`http://localhost:3000/students/${id}`, data)
  }

  // get request
  getStudentList():Observable<any> {
    return this._http.get('http://localhost:3000/students')
  }

  deleteStudent(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/students/${id}`);
  }
}
