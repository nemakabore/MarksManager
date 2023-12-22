// import { Component, OnInit } from '@angular/core';
// import { Student } from '../models/student.model';
// import { StudentService } from '../student.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-student-details',
//   templateUrl: './student-details.page.html',
//   styleUrls: ['./student-details.page.scss'],
// })
// export class StudentDetailsPage implements OnInit {
//   student: any;

//   constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService) {}

//   ngOnInit() {
//     // Vérification de nullabilité
//     const studentId = this.activatedRoute.snapshot.paramMap.get('id');

//     if (studentId !== null) {
//       this.student = this.studentService.getStudentById(+studentId);
//     } else {
//       console.error('ID de l\'étudiant non disponible.');
//     }
//   }
// }


// student-details.page.ts

// import { Component, OnInit } from '@angular/core';
// import { StudentService } from '../student.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-student-details',
//   templateUrl: './student-details.page.html',
//   styleUrls: ['./student-details.page.scss'],
// })
// export class StudentDetailsPage implements OnInit {
//   student: any;

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     public studentService: StudentService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     const studentId = this.activatedRoute.snapshot.paramMap.get('id');

//     if (studentId !== null) {
//       this.student = this.studentService.getStudentById(+studentId);
//     } else {
//       console.error('ID de l\'étudiant non disponible.');
//     }
//   }

//   goToAddMarkPage() {
//     // Naviguer vers la page 'edit-mark' avec l'ID de l'étudiant
//     this.router.navigate(['/edit-mark', this.student.id]);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark } from '../models/mark.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  student: any;
  mark: Mark[] = [];
  //studentService: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private studentService: StudentService
  ) {
    this.mark = [];
  }

  async ngOnInit() {
    const studentId = this.activatedRoute.snapshot.paramMap.get('id');

    if (studentId !== null) {
      this.student = await this.getStudentById(+studentId);
    } else {
      console.error('ID de l\'étudiant non disponible.');
    }
  }

  async getStudentById(id: number) {
    let student: any;
    await this.storage.forEach((v: any) => {
      if (v.id === id) {
        student = v;
      }
    });
    this.mark = student.marks;
    return student;
  }

  goToAddMarkPage() {
    if (this.student) {
      // Naviguer vers la page 'edit-mark' avec l'ID de l'étudiant
      this.router.navigate(['/edit-mark', this.student.id]);
    } else {
      console.error('Erreur : étudiant non défini.');
    }
  }





  async deleteStudent() {
    await this.studentService.deleteStudent(this.student.id);
  this.router.navigate(['/student-list']);
}


goToEditStudentPage() {
  this.router.navigate(['/add-student', this.student.id]);
}


}
