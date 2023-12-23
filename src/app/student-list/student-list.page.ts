import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../student.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit, OnDestroy {

  students: Student[] = [];
  private subscription: Subscription;

  constructor(
    private storage : Storage,
    private studentService: StudentService) {
    this.subscription = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    /** */
   this.readAllStudent();
    this.subscription.add(
      this.studentService.onStudentListUpdate().subscribe(() => {
        this.students = this.studentService.getStudents();
      })
    );

    //attention: pour vider le stockage, à décommenter seulement au besoin
    //await this.studentService.clearStudents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
//pour San
  // readAllStudent() {
  //   this.students = [];
  //   this.storage.forEach((v:Student) => {
  //     this.students.push(v);
  //   });
  //   return this.students;
  // }

  readAllStudent() {
    this.students = this.studentService.getStudents();
  }
  ionViewWillEnter() {
    this.readAllStudent();
  }
  }
