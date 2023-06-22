import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EduExpRoutingModule } from './edu-exp-routing.module';
import { EduExpComponent } from './edu-exp.component';


@NgModule({
  declarations: [
    EduExpComponent
  ],
  imports: [
    CommonModule,
    EduExpRoutingModule
  ]
})
export class EduExpModule { }
