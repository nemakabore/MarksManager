import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  students: Student[] = [
    {
      id: 1,
      nom: 'Ouedraogo',
      prenom: 'Ali',
      niveau: 'IC1',
      note: { score: 16, course: 'HG', semester: 'S1' } // Ajout de la propriété note correspondant à un objet Mark
    },
    {
      id: 2,
      nom: 'Ouedraogo',
      prenom: 'azerty',
      niveau: 'IC1',
      note: { score: 17, course: 'math', semester: 'S1' } // Ajout de la propriété note correspondant à un objet Mark
    },
    {
      id: 3,
      nom: 'qwerty',
      prenom: 'azerty',
      niveau: 'IC1',
      note: { score: 15, course: 'SVT', semester: 'S1' } // Ajout de la propriété note correspondant à un objet Mark
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
