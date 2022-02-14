import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }
}
