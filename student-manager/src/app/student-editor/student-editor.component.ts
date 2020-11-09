import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit {

  id: number;
  student: Student;
  error: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') === null) {
      this.student = {
        firstname: 'New', lastname: 'Student', year: 'NewYear', id: undefined
      };
    } else {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.studentService.getStudent(this.id).subscribe(
        res => this.student = res,
        err => this.error = 'Error while loading'
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.student.id === undefined) {
      this.studentService.createStudent({
        firstname: this.student.firstname,
        lastname: this.student.lastname,
        year: this.student.lastname
      }).subscribe(
        res => this.router.navigateByUrl(`/students/${res.id}`),
        err => this.error = 'Error while saving'
      );
    } else {
      this.studentService.updateStudent(this.id, {
        firstname: this.student.firstname,
        lastname: this.student.lastname,
        year: this.student.lastname
      }).subscribe(
        res => this.router.navigateByUrl(`/students`),
        err => this.error = 'Error while saving'
      );
    }
  }

  delete(): void {
    this.studentService.deleteStudent(this.id).subscribe(
      res => this.router.navigateByUrl(`/students`),
      err => this.error = 'Error while deleting'
    );
  }

}
