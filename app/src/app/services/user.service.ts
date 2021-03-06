import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
  ) {}

  getCurrentUser() {
    const userData = localStorage.getItem('user');

    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(userData: any) {
     localStorage.setItem('user', JSON.stringify(userData));
  }

}
