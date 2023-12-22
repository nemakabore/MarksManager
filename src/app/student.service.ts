// student.service.ts! bon
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from './models/student.model';
import { Mark } from './models/mark.model';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // onStudentListUpdate() {
  //   throw new Error('Method not implemented.');
  // }
  // notifyStudentListUpdate() {
  //   throw new Error('Method not implemented.');
  // }
  private students: Student[] = [

    // {
    //   id: 1,
    //   nom: 'Kabore',
    //   prenom:'Nema',
    //   niveau: 'IC3'
    // },

    // {
    //   id: 2,
    //   nom: 'Kabore',
    //   prenom:'Abdine',
    //   niveau: 'IC2'
    // },
    // {
    //   id: 3,
    //   nom: 'tonde',
    //   prenom:'Kenneth',
    //   niveau: 'IC3'
    // }

  ];
  //private nextStudentId = 1; // Utilisez un compteur pour attribuer des ID uniques

  private studentListUpdate = new Subject<void>();
  constructor(
    private storage : Storage,
  ) {
    this.init();
  }

  async init(){
    await this.storage.create();
  }

  getStudents() {
    return this.students;
  }
  private getId():number{
    let idMAx = 0;
    this.students.forEach(idStudent =>{
      if(idStudent.id && idStudent.id > idMAx){
        idMAx = idStudent.id;
      }
    });
    return idMAx +1;
  }

  async addStudent(student: Student) {
    let key = this.getId();

    await this.storage.set(`student${key}`, student);
      this.notifyStudentListUpdate();
  }

  onStudentListUpdate() {
    return this.studentListUpdate.asObservable();
  }

  notifyStudentListUpdate() {
    this.studentListUpdate.next();
  }
  getStudentById(id: number) {
    return this.students.find((student) => student.id === id);
  }

  addMarkToStudent(studentId: number, mark: Mark) {
    const student = this.getStudentById(studentId);
    if (student) {
      if (!student.marks) {
        student.marks = [];
      }
      student.marks.push(mark);
      this.notifyStudentListUpdate();
    }
  }
  async deleteStudent(id: number) {
        await this.storage.remove(id.toString());
        this.students = this.students.filter(student => student.id !== id);
        this.notifyStudentListUpdate();
      }

getMarksByStudentId(studentId: number): Mark[] {
  const student = this.getStudentById(studentId);

  if (student) {
    return student.marks || [];
  } else {
    return [];
  }
}



}

// student.service.ts
// import { Storage } from '@ionic/storage-angular';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Student } from './models/student.model';
// import { Mark } from './models/mark.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class StudentService {
//   private students: Student[] = [];
//   private studentListUpdate = new Subject<void>();

//   constructor(private storage: Storage) {
//     this.init();
//   }

//   //attention: pour vider le stockage, à décommenter seulement au besoin
//   // async clearStudents() {
//   //   await this.storage.clear();
//   // }

//   async init() {
//     // Assurez-vous que le service Storage est créé
//     await this.storage.create();

//     // Charger les étudiants depuis le stockage lors de l'initialisation du service
//     this.loadStudents();
//   }

//   getStudents() {
//     return this.students;
//   }

//   private getId(): number {
//     let idMax = 0;
//     this.students.forEach((student) => {
//       if (student.id && student.id > idMax) {
//         idMax = student.id;
//       }
//     });
//     return idMax + 1;
//   }

//   async addStudent(student: Student) {
//     student.id = this.getId();
//     this.students.push(student);
//     this.notifyStudentListUpdate();

//     // Sauvegarder les étudiants dans le stockage après chaque ajout
//     await this.saveStudents();
//   }

//   onStudentListUpdate() {
//     return this.studentListUpdate.asObservable();
//   }

//   notifyStudentListUpdate() {
//     this.studentListUpdate.next();
//   }

//   getStudentById(id: number) {
//     return this.students.find((student) => student.id === id);
//   }

//   async addMarkToStudent(studentId: number, mark: Mark) {
//     const student = this.getStudentById(studentId);
//     if (student) {
//       if (!student.marks) {
//         student.marks = [];
//       }
//       student.marks.push(mark);
//       this.notifyStudentListUpdate();

//       // Sauvegarder les étudiants dans le stockage après chaque ajout de note
//       await this.saveStudents();
//     }
//   }

//   getMarksByStudentId(studentId: number): Mark[] {
//     const student = this.getStudentById(studentId);

//     if (student) {
//       return student.marks || [];
//     } else {
//       return [];
//     }
//   }

//   // Méthode pour charger les étudiants depuis le stockage
//   private async loadStudents() {
//     const storedStudents = await this.storage.get('students');
//     if (storedStudents) {
//       this.students = storedStudents;
//     }
//   }

//   // Méthode pour sauvegarder les étudiants dans le stockage
//   private async saveStudents() {
//     await this.storage.set('students', this.students);
//   }
// }


// import { Storage } from '@ionic/storage-angular';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Student } from './models/student.model';
// import { Mark } from './models/mark.model';


// @Injectable({
//   providedIn: 'root',
// })
// export class StudentService {
//   private students: Student[] = [];
//   private studentListUpdate = new Subject<void>();
//   private storageReady: Promise<void>;

//   constructor(private storage: Storage) {
//     this.storageReady = this.init();
//   }

//   async init() {
//     // Assurez-vous que le service Storage est créé
//     await this.storage.create();

//     // Charger les étudiants depuis le stockage lors de l'initialisation du service
//     this.loadStudents();
//   }

//   getStudents() {
//     return this.students;
//   }

//   private getId(): number {
//     let idMax = 0;
//     this.students.forEach((student) => {
//       if (student.id && student.id > idMax) {
//         idMax = student.id;
//       }
//     });
//     return idMax + 1;
//   }

//   async addStudent(student: Student) {
//     student.id = this.getId();
//     this.students.push(student);
//     this.notifyStudentListUpdate();

//     // Sauvegarder les étudiants dans le stockage après chaque ajout
//     await this.saveStudents();
//   }

//   onStudentListUpdate() {
//     return this.studentListUpdate.asObservable();
//   }

//   notifyStudentListUpdate() {
//     this.studentListUpdate.next();
//   }

//   getStudentById(id: number) {
//     return this.students.find((student) => student.id === id);
//   }

//   async addMarkToStudent(studentId: number, mark: Mark) {
//     const student = this.getStudentById(studentId);
//     if (student) {
//       if (!student.marks) {
//         student.marks = [];
//       }
//       student.marks.push(mark);
//       this.notifyStudentListUpdate();

//       // Sauvegarder les étudiants dans le stockage après chaque ajout de note
//       await this.saveStudents();
//     }
//   }

//   getMarksByStudentId(studentId: number): Mark[] {
//     const student = this.getStudentById(studentId);

//     if (student) {
//       return student.marks || [];
//     } else {
//       return [];
//     }
//   }

//   // Méthode pour charger les étudiants depuis le stockage
//   private async loadStudents() {
//     await this.storageReady;
//     const storedStudents = await this.storage.get('students');
//     if (Array.isArray(storedStudents)) {
//       this.students = storedStudents;
//     } else {
//       this.students = [];
//     }
//   }


//   async deleteStudent(id: number) {
//     await this.storage.remove(id.toString());
//     this.students = this.students.filter(student => student.id !== id);
//     this.notifyStudentListUpdate();
//   }



//   // Méthode pour sauvegarder les étudiants dans le stockage
//   private async saveStudents() {
//     await this.storage.set('students', this.students);
//   }
// }
