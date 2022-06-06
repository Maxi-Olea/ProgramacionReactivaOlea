import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData:User = {
    username: 'Admin',
    rol: 'admin'
  };

  constructor() { }

  getUser():Observable<User> {
    return of(this.userData)
  }

  getTime():Observable<string> {
    let time = new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
    return time
  }
}
