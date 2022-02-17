import { AuthLoginService } from '../services/auth-login.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuServiceService } from 'src/app/services/menu-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  model: ILogin = { username: "admin", password: "123" }
  loginForm!: FormGroup;
  message!: string;
  returnUrl!: string;
  test: ILogin = { username: "", password: "" };
  dashboard!: DashboardComponent;
  user!: UserDtoIn;
  authorized!: boolean;
  responseUser!: UserDtoIn;


  credentials = {
    username: '',
    password: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthLoginService,
    private twiterService: TwiterServiceService,
    private http: HttpClient,
    private pipe: DatePipe,
    private menuService: MenuServiceService
  ) {

  }

  ngOnInit() {
    this.authorized = false;
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();
    this.test.username = "";
    this.test.password = "";

  }
  get f() { return this.loginForm.controls; }

  login() {
    console.log('... login');
    let btoatGen = window.btoa(this.test.username + ':' + this.test.password);
    localStorage.setItem('btoa', btoatGen);
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'authorization': 'Basic ' + btoatGen,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE'
      })
    };
    let _login = this.test.username + '-' + this.test.password;
    this.http.get('http://localhost:9000/api/user/login/' + _login, httpOptions).subscribe(
      (response: any) => {
        if (response.username) {
          this.authorized = true;
          this.user = response;
          console.log('Logged user: ' + JSON.stringify(this.responseUser));
        }
        if (this.authorized) {
          this.writeUserName();
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log("Login successful");
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('menuOn', 'true');
          this.menuService.setMenuStatus(true);
          this.router.navigate([this.returnUrl]);
        }
        else {
          console.log('Login failed');
          this.message = "Please check your userid and password";
          this.authorized = false;
        }

      },
      (error) => {
        console.log('Login failed');
        this.message = "Proszę sprawdź nazwę użytkownika i hasło i spróbuj ponownie";
        this.authorized = false;
      }
    );

  }

  logout() {
    this.dashboard.logout();
  }

  writeUserName() {
    localStorage.setItem('name', this.user.name);
    localStorage.setItem('surname', this.user.surname);
    localStorage.setItem('username', this.user.username);
  }

  ngOnDestroy(): void {
  }

}  