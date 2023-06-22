import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EduExpComponent } from './edu-exp.component';

const routes: Routes = [{ path: '', component: EduExpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EduExpRoutingModule { }
