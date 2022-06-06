import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() user!:User; //Datos del usuario logueado

  time!:Observable<string>

  constructor(
    private userService: UserService
   ) { }

  ngOnInit(): void {
    this.time = this.userService.getTime()  
  }



}
