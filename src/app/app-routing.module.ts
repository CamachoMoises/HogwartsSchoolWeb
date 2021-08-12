import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule), pathMatch:'full' },
  { path: 'notFound', loadChildren: () => import('./components/pages/notFound/not-found.module').then(m => m.NotFoundModule) },
  { path: 'about', loadChildren: () => import('./components/pages/about/about/about.module').then(m => m.AboutModule) },
  { path: 'characters', loadChildren: () => import('./components/pages/characters/characters.module').then(m => m.CharactersModule) },
  { path: 'students', loadChildren: () => import('./components/pages/students/students.module').then(m => m.StudentsModule) },
  { path: 'staff', loadChildren: () => import('./components/pages/staff/staff.module').then(m => m.StaffModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
