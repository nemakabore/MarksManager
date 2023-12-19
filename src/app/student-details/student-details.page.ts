import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  student: any;

  constructor() { }

  ngOnInit() {
    
  }

}
