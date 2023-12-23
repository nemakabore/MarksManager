import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Storage } from '@ionic/storage-angular';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-semester-moyen',
  templateUrl: './semester-moyen.page.html',
  styleUrls: ['./semester-moyen.page.scss'],
})
export class SemesterMoyenPage implements OnInit {
  averageBySemester: any;
  students: any[] = [];

  constructor(private studentService: StudentService, private storage: Storage) { } // Injectez Storage ici

  async ngOnInit() {
    this.students = await this.studentService.getStudents();
    const allAverages = await this.storage.get('averages');
    this.students = this.students.map((student) => {
      const averageBySemester = allAverages[student.id];
      return {
        ...student,
        averageBySemester,
      };
    });
  }


  async readAllStudent() {
    this.students = await this.studentService.getStudents();
  }

  async ionViewWillEnter() {
    await this.readAllStudent();
  }
}
