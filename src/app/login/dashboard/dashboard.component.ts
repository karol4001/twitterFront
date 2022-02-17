import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/login/services/auth-login.service';
import { User, UserDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id: string | any;
  public isLogged!: boolean;
  notLoggedFlag: boolean = true;

  public userName!: string;
  public userSurname!: string;

  constructor(
    private router: Router,
    private authService: AuthLoginService,
    private twiterService: TwiterServiceService) {
  }

  ngOnInit() {
    let user: UserDtoIn = JSON.parse(localStorage.getItem('user') as string);
    this.userName = user.name;
    this.userSurname = user.surname;
    if (this.userName.length <= 1) {
      console.log('no username !');
      this.authService.logout();
    }
  }

  logout() {
    this.isLogged = false;
    console.log(this.isLogged);
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }
} 
