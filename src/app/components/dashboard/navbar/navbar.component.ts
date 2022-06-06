import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { StudentService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user!:User;

  constructor(
    private studentsService: StudentService,
    private router: Router
   ) { }

  ngOnInit(): void {
  }

  onClickHome() { //navego a la ruta base del dashboard
    this.router.navigate(['/']);
  }

  onClickUser(){ //Emite un evento al app component para quese renderice el form de usuarios
    
  }

  onClickAdd() { //Setea el studentToEdit a NULL y navega a la ruta de addstudent
    this.studentsService.setStudentToEdit(null)
    .then((res) => {
      console.log(res)
      this.router.navigate(['dashboard/addstudent']);
    })
    .catch((error) => console.log('Error: ', error.message))
  }

  onClickCourse() { //Emite un evento al app component para listar los cursos
    
  }

}
