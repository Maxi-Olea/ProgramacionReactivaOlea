import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/interfaces/student.interface';
import { User } from 'src/app/interfaces/user.interface';
import { StudentService } from 'src/app/services/student-service.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription(); //Propiedad con la que vinculo todas las subs a observables para luego desubscribirme en el ngOnDestroy

  @ViewChild('table') table!: MatTable<any>;

  user!:User;

  studentsData!:Student[];

  displayedColumns = ['id', 'name', 'courses', 'actions'];
  dataSource = new MatTableDataSource(this.studentsData);

  constructor(
    private userService: UserService,
    private studentsService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((userData) => {
      console.log(userData)
      this.user = userData
    })
    this.getStudents();
  }


  getStudents() {
    this.subscription.add(
      this.studentsService.getStudents()
      .pipe(
        map((students) => {
          students.forEach(student => {
            student.lastname = student.lastname.toUpperCase();
          });
          return students
        })
      )
      .subscribe((data: Student[]) => {
        this.studentsData = data
        console.log('Data: ', this.studentsData)
      })
    )
  }

  onDeleteStudent(el:any) {
    /* Se busca el elemento por el id en el array de estudiantes,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el listado de estudiantes en el servicio */
    let index = this.studentsData.findIndex((student) => student.id === el.id);
    this.studentsData.splice(index,1);
    this.table.renderRows()
    this.onUpdateDeleteStudents(this.studentsData)
    this.studentsService.setStudents(this.studentsData)
    .then((res) => {
      console.log(res)
      //this.router.navigate(['/'])
    })
    .catch((error) => console.log('Error: ', error.message));
  }

  onClickEdit(student:Student) { //Actualiza el estudiante a editar en el servicio
    student.lastname = student.lastname[0] + student.lastname.slice(1).toLowerCase(); //Vuelve a dejar el apellido en PascalCase
    this.studentsService.setStudentToEdit(student)
    .then((res) => { //Se actualizo en el servicio el studentToEdit
      console.log(res)
      this.router.navigate(['dashboard/addstudent'])
    })
    .catch((error) => {
      console.log('Error: ', error.message)
    });
  }

  onClickInscription(student:Student) {
    
  }

  onUpdateDeleteStudents(el:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.studentsData=el;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
