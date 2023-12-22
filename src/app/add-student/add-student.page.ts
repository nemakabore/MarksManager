import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})

export class AddStudentPage {
  students : Student[]= [];
  student = {
    id:0,
    nom: '',
    prenom: '',
    niveau: '',
   //note: null,
  };

  constructor(private studentService: StudentService, private router: Router) {}

  onSubmit() {
    if (this.student.nom !== '' && this.student.prenom !== '' && this.student.niveau !== '') {
      // this.studentService.addStudent(this.student);
      // // Réinitialiser le formulaire ou faire d'autres actions si nécessaire
      // studentForm.resetForm();
      // console.log('Formulaire valide. Données:', this.student);
      // Ajoutez ici le code pour sauvegarder les données ou effectuer d'autres actions.
      //console.log(this.student)
      //this.studentService.notifyStudentListUpdate();
      const newStudent: Student = {
        id:this.getId(),
        nom: this.student.nom,
        prenom: this.student.prenom,
        niveau: this.student.niveau,


      };

      this.studentService.addStudent(newStudent);
      this.student = {
        id:1,
        nom: '',
        prenom: '',
        niveau: '',
       //note: null,
      };
      //window.history.back();
      this.router.navigate(['/student-list']);
    } else {
      console.error('Formulaire non valide. Veuillez remplir tous les champs correctement.');
    }
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
}
