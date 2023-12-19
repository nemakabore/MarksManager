import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

    {
      id: 4,
      nom: 'werty',
      prenom: 'zerty',
      niveau: 'IC1',
      note: { score: 15, course: 'SVT', semester: 'S1' } // Ajout de la propriété note correspondant à un objet Mark
    },

  ];

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit() {
  // }

}
