import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      res => this.students = res
    );
  }

}
