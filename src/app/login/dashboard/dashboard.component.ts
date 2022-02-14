import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/login/services/auth-login.service';
import { User } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id: string | any;
  public isLogged!: boolean;

  public userName!: string;
  public userSurname!: string;

  // = {
  //   name: 'a',
  //   surname: 's',
  //   password: '',
  //   email: '',
  //   username: ''
  // };

  constructor(
    private router: Router,
    private authService: AuthLoginService,
    private twiterService: TwiterServiceService) {

  }

  ngOnInit() {
    this.id = localStorage.getItem('token');
    console.log(this.id);
    this.isLogged = true;
    console.log(this.isLogged);
    this.userName = localStorage.getItem('name') as string;
    this.userSurname = localStorage.getItem('surname') as string;
  }

  logout() {
    this.isLogged = false;
    console.log(this.isLogged);
    console.log('logout');

    this.authService.logout();
    this.router.navigate(['']);
  }
} 
