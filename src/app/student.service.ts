// student.service.ts! bon
// import { Storage } from '@ionic/storage-angular';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Student } from './models/student.model';
// import { Mark } from './models/mark.model';


// @Injectable({
//   providedIn: 'root',
// })
// export class StudentService {
//   // onStudentListUpdate() {
//   //   throw new Error('Method not implemented.');
//   // }
//   // notifyStudentListUpdate() {
//   //   throw new Error('Method not implemented.');
//   // }
//   private students: Student[] = [

//     // {
//     //   id: 1,
//     //   nom: 'Kabore',
//     //   prenom:'Nema',
//     //   niveau: 'IC3'
//     // },

//     // {
//     //   id: 2,
//     //   nom: 'Kabore',
//     //   prenom:'Abdine',
//     //   niveau: 'IC2'
//     // },
//     // {
//     //   id: 3,
//     //   nom: 'tonde',
//     //   prenom:'Kenneth',
//     //   niveau: 'IC3'
//     // }

//   ];
//   //private nextStudentId = 1; // Utilisez un compteur pour attribuer des ID uniques

//   private studentListUpdate = new Subject<void>();
//   constructor(
//     private storage : Storage,
//   ) {
//     this.init();
//   }

//   async init(){
//     await this.storage.create();
//   }

//   getStudents() {
//     return this.students;
//   }
//   private getId():number{
//     let idMAx = 0;
//     this.students.forEach(idStudent =>{
//       if(idStudent.id && idStudent.id > idMAx){
//         idMAx = idStudent.id;
//       }
//     });
//     return idMAx +1;
//   }

//   async addStudent(student: Student) {
//     let key = this.getId();

//     await this.storage.set(`student${key}`, student);
//       this.notifyStudentListUpdate();
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

//   addMarkToStudent(studentId: number, mark: Mark) {
//     const student = this.getStudentById(studentId);
//     if (student) {
//       if (!student.marks) {
//         student.marks = [];
//       }
//       student.marks.push(mark);
//       this.notifyStudentListUpdate();
//     }
//   }
//   async deleteStudent(id: number) {
//         await this.storage.remove(id.toString());
//         this.students = this.students.filter(student => student.id !== id);
//         this.notifyStudentListUpdate();
//       }

// getMarksByStudentId(studentId: number): Mark[] {
//   const student = this.getStudentById(studentId);

//   if (student) {
//     return student.marks || [];
//   } else {
//     return [];
//   }
// }



// }

// student.service.ts
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from './models/student.model';
import { Mark } from './models/mark.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [];
  private studentListUpdate = new Subject<void>();

  constructor(private storage: Storage) {
    this.init();
  }

  //attention: pour vider le stockage, à décommenter seulement au besoin
  // async clearStudents() {
  //   await this.storage.clear();
  // }

  async init() {
    // Assurez-vous que le service Storage est créé
    await this.storage.create();

    // Charger les étudiants depuis le stockage lors de l'initialisation du service
    this.loadStudents();
  }

  getStudents() {
    return this.students;
  }

  private getId(): number {
    let idMax = 0;
    this.students.forEach((student) => {
      if (student.id && student.id > idMax) {
        idMax = student.id;
      }
    });
    return idMax + 1;
  }

  async addStudent(student: Student) {
    student.id = this.getId();
    this.students.push(student);
    this.notifyStudentListUpdate();

    // Sauvegarder les étudiants dans le stockage après chaque ajout
    await this.saveStudents();
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

  async addMarkToStudent(studentId: number, mark: Mark) {
    const student = this.getStudentById(studentId);
    if (student) {
      if (!student.marks) {
        student.marks = [];
      }
      student.marks.push(mark);
      this.notifyStudentListUpdate();

      // Sauvegarder les étudiants dans le stockage après chaque ajout de note
      await this.saveStudents();
    }
  }
  /** */
  async getStudentByIdFromStorage(id: number): Promise<Student | undefined> {
    // Récupérer tous les étudiants du stockage
    const students = await this.storage.get('students');

    // Trouver l'étudiant avec l'ID correspondant
    const student = students.find((s: Student) => s.id === id);

    return student;
  }
//** */
  getMarksByStudentId(studentId: number): Mark[] {
    const student = this.getStudentById(studentId);

    if (student) {
      return student.marks || [];
    } else {
      return [];
    }
  }

  // Méthode pour charger les étudiants depuis le stockage
  private async loadStudents() {
    const storedStudents = await this.storage.get('students');
    if (storedStudents) {
      this.students = storedStudents;
      //**** */
      this.notifyStudentListUpdate();
    }
  }

  // Méthode pour sauvegarder les étudiants dans le stockage
  private async saveStudents() {
    await this.storage.set('students', this.students);
  }
  async deleteStudent(id: number) {
        await this.storage.remove(id.toString());
        this.students = this.students.filter(student => student.id !== id);
        this.notifyStudentListUpdate();
      }

      //calcul de moyenne
      async getAverageBySemester(studentId: number) {
        const student = await this.getStudentByIdFromStorage(studentId);
        if (!student || !student.marks) {
          return null;
        }

        const marksBySemester: { [key: string]: number[] } = student.marks.reduce((acc: { [key: string]: number[] }, mark: Mark) => {
          if (mark.score !== null) {
            if (!acc[mark.semester]) {
              acc[mark.semester] = [];
            }
            acc[mark.semester].push(mark.score);
          }
          return acc;
        }, {});

        const averageBySemester: { [key: string]: number } = {};
        for (const semester in marksBySemester) {
          const marks = marksBySemester[semester];
          const sum = marks.reduce((a, b) => a + b, 0);
          averageBySemester[semester] = sum / marks.length;
        }

        await this.storage.set(`average_${studentId}`, averageBySemester);

        let allAverages = await this.storage.get('averages');
  if (!allAverages) {
    allAverages = {};
  }
        allAverages[studentId] = averageBySemester;
        await this.storage.set('averages', allAverages);
        allAverages[studentId] = averageBySemester;
        return averageBySemester;

      }

      // async getAverageOfAllStudentsBySemester() {
      //   const students = await this.storage.get('students');
      //   const marksBySemester: { [key: string]: number[] } = {};

      //   for (const student of students) {
      //     if (student.marks) {
      //       for (const mark of student.marks) {
      //         if (mark.score !== null) {
      //           if (!marksBySemester[mark.semester]) {
      //             marksBySemester[mark.semester] = [];
      //           }
      //           marksBySemester[mark.semester].push(mark.score);
      //         }
      //       }
      //     }
      //   }

      //   const averageBySemester: { [key: string]: number } = {};
      //   for (const semester in marksBySemester) {
      //     const marks = marksBySemester[semester];
      //     const sum = marks.reduce((a, b) => a + b, 0);
      //     averageBySemester[semester] = sum / marks.length;
      //   }

      //   return averageBySemester;
      // }

      async getAverageOfAllStudentsBySemester() {
        const students = await this.storage.get('students');
        const marksBySemester: { [key: string]: { [key: string]: number[] } } = {};
        const averageBySemester: { [key: string]: { [key: string]: number } } = {};

        for (const student of students) {
          if (student.marks) {
            for (const mark of student.marks) {
              if (mark.score !== null) {
                if (!marksBySemester[student.id]) {
                  marksBySemester[student.id] = {};
                }
                if (!marksBySemester[student.id][mark.semester]) {
                  marksBySemester[student.id][mark.semester] = [];
                }
                marksBySemester[student.id][mark.semester].push(mark.score);
              }
            }
          }
        }

        for (const studentId in marksBySemester) {
          if (!averageBySemester[studentId]) {
            averageBySemester[studentId] = {};
          }
          for (const semester in marksBySemester[studentId]) {
            const marks = marksBySemester[studentId][semester];
            const sum = marks.reduce((a: number, b: number) => a + b, 0);
            averageBySemester[studentId][semester] = sum / marks.length;
          }
        }

        return averageBySemester;
      }

}


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
