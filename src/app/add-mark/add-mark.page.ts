import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.page.html',
  styleUrls: ['./add-mark.page.scss'],
})

export class AddMarkPage {
  mark = {
    score: null,
    course: '',
    semester: '',
  };

  onSubmit(markForm: NgForm) {
    if (markForm.valid) {
      // Logique à exécuter lorsque le formulaire est valide
      console.log('Formulaire valide. Données:', this.mark);
      // Ajoutez ici le code pour sauvegarder les données ou effectuer d'autres actions.
    } else {
      console.error('Formulaire non valide. Veuillez remplir tous les champs correctement.');
    }
  }
}
