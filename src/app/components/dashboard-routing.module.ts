import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsFormComponent } from './dashboard/students-form/students-form.component';
import { StudentsListComponent } from './dashboard/students-list/students-list.component';

const routes: Routes = [
    { path: '', component: StudentsListComponent },
    { path: 'addstudent', component: StudentsFormComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }