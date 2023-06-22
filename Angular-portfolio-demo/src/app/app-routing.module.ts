import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'projects', loadChildren: () => import('./projects/projects.module')
.then(m => m.ProjectsModule) }, { path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule) }, { path: 'edu_exp', loadChildren: () => import('./edu-exp/edu-exp.module').then(m => m.EduExpModule) }, { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
