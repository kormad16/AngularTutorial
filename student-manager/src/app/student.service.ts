import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StudentData {
  firstname: string;
  lastname: string;
  year: string;
}

export interface Student extends StudentData {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  public getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`http://localhost:3000/students/${id}`);
  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:3000/students`);
  }

  public createStudent(data: StudentData): Observable<any> {
    return this.http.post('http://localhost:3000/students', data);
  }

  public updateStudent(id: number, data: StudentData): Observable<any> {
    return this.http.put(`http://localhost:3000/students/${id}`, data);
  }

  public deleteStudent(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/students/${id}`);
  }

}
