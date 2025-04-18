import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash-sreen',
    loadChildren: () => import('./splash-sreen/splash-sreen.module').then( m => m.SplashSreenPageModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then( m => m.StudentDetailsPageModule)
  },
  {
    path: 'semester-moyen',
    loadChildren: () => import('./semester-moyen/semester-moyen.module').then( m => m.SemesterMoyenPageModule)
  },
  {
    path: 'add-student',
    loadChildren: () => import('./add-student/add-student.module').then( m => m.AddStudentPageModule)
  },
  {
    path: 'add-mark',
    loadChildren: () => import('./add-mark/add-mark.module').then( m => m.AddMarkPageModule)
  },
  {
    path: 'edit-mark',
    loadChildren: () => import('./edit-mark/edit-mark.module').then( m => m.EditMarkPageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
