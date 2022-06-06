import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userData!:User;
  subcription:Subscription = new Subscription();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subcription.add(
      this.userService.getUser().subscribe((userData) => {
        console.log(userData)
        this.userData = userData
      })
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
