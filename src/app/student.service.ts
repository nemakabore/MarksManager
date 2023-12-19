// student.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: any[] = [];

  constructor() {}

  getStudents() {
    return this.students;
  }

  addStudent(student: any) {
    this.students.push(student);
  }

  getStudentById(id: number) {
    return this.students.find(student => student.id === id);
  }
}
