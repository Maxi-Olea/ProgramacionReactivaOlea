import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit, OnDestroy {

  studentForm: FormGroup;

  studentToEdit!:Student;

  subscription:Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.subscription.add(
      this.studentsService.getStudentToEdit().subscribe((student) => {
        this.studentToEdit = student
      })
    );
    if(this.studentToEdit) {
      this.studentForm.get('name')?.patchValue(this.studentToEdit.name)
      this.studentForm.get('lastname')?.patchValue(this.studentToEdit.lastname)
      this.studentForm.get('email')?.patchValue(this.studentToEdit.email)
      this.studentForm.get('birthday')?.patchValue(this.studentToEdit.birthday)
    }
  }

  onSubmit() {
    let students:Student[]=[];
    this.subscription.add(
      this.studentsService.getStudents().subscribe((studentsData) => {
        students = studentsData
      })
    );
    let index = 1;
    if(students.length>0 && !this.studentToEdit) {
      index = students.length + 1;
      this.studentForm.value['id'] = index;
      students.push(this.studentForm.value);
    }

    if(this.studentToEdit) {
      let indexOfStudent = students.findIndex((student) => student.id === this.studentToEdit.id);
      this.studentForm.value['id'] = this.studentToEdit.id;
      this.studentForm.value['cursos'] = this.studentToEdit.cursos;
      students[indexOfStudent] = this.studentForm.value;
    }
    this.studentsService.setStudents(students)
    .then((res) => {
      console.log(res)
      this.router.navigate(['/'])
    })
    .catch((error) => console.log('Error: ', error.message));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
