import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})

export class AddStudentPage {
  student = {
    id: null,
    nom: '',
    prenom: '',
    niveau: '',
   // note: null,
  };

  onSubmit(studentForm: NgForm) {
    if (studentForm.valid) {
      //this.studentService.addStudent(this.student);
      // Réinitialiser le formulaire ou faire d'autres actions si nécessaire
      studentForm.resetForm();
      console.log('Formulaire valide. Données:', this.student);
      // Ajoutez ici le code pour sauvegarder les données ou effectuer d'autres actions.
    } else {
      console.error('Formulaire non valide. Veuillez remplir tous les champs correctement.');
    }
  }
}
