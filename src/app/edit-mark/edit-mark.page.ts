import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mark } from '../models/mark.model';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-mark',
  templateUrl: './edit-mark.page.html',
  styleUrls: ['./edit-mark.page.scss'],
})

export class EditMarkPage {
  mark: Mark = {
    score: null,
    course: '',
    semester: '',
  };

  studentId: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    // Récupérer l'ID de l'étudiant à partir de l'URL
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit() {
    if (this.mark.score !== null && this.mark.course !== '' && this.mark.semester !== '') {
      // Créer un nouvel objet de note
      const newMark: Mark = {
        score: this.mark.score,
        course: this.mark.course,
        semester: this.mark.semester,
      };

      // Ajouter la note à l'étudiant avec l'ID correspondant
      this.studentService.addMarkToStudent(this.studentId, newMark);

      // Réinitialiser le formulaire
      this.mark = {
        score: null,
        course: '',
        semester: '',
      };

      // Rediriger vers la liste des étudiants ou une autre page si nécessaire
      this.router.navigate(['/student-details', this.studentId]);
    } else {
      console.error('Formulaire non valide. Veuillez remplir tous les champs correctement.');
    }
  }
}
