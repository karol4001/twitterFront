import { AuthLoginService } from '../services/auth-login.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User, UserDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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


  testUser: User = {
    name: 'Clint',
    surname: 'Eastwood',
    password: '123',
    email: 'testUser1@test',
    username: 'clint123'
  }

  testUser1: User = {
    name: 'Clint',
    surname: 'Eastwood',
    password: '123',
    email: 'testUser1@test',
    username: 'clint123'
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthLoginService,
    private twiterService: TwiterServiceService,
    private http: HttpClient,
    private pipe: DatePipe
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

    // wysyłanie danych do serwera REST w celu autoryzacji ...

    // odbiór danych z serwera REST
    this.http.post('http://localhost:9000/api/login', this.test).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.headers);
        if (response.username) {
          this.authorized = true;
          this.responseUser = response;
          console.log('Logged user: ' + this.responseUser);
        }

        if (this.authorized) {
          this.user = this.responseUser;
          this.writeUserName();
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log("Login successful");
          localStorage.setItem('isLoggedIn', "true");
          // localStorage.setItem('token', this.f['username'].value);
          this.router.navigate([this.returnUrl]);
        }
        else {

          console.log('Login failed');
          this.message = "Please check your userid and password";
          this.authorized = false;
        }
        // alert(JSON.stringify(response));

      },
      (error) => {
        console.log('Login failed');
        this.message = "Proszę sprawdź nazwę użytkownika i hasło i spróbuj ponownie";
        this.authorized = false;
        // alert(JSON.stringify(error));
      }
    );

    // if (this.test.username == this.model.username && this.test.password == this.model.password) {
    //   this.user = this.testUser;

  }

  logout() {
    this.dashboard.logout();
  }

  writeUserName() {
    // this.twiterService.setUser(this.user);
    localStorage.setItem('name', this.user.name);
    localStorage.setItem('surname', this.user.surname);
    localStorage.setItem('username', this.user.username);
    let date = '';
    // if (this.user.creationDateTime.toDateString() != null) {
    // date = this.user.creationDateTime.toDateString();
    // }
    // localStorage.setItem('joined', this.pipe.transform(date, 'dd-MM-yyyy gg:mm:ss') as string);
    console.log('write user data:' + this.user);
  }

  ngOnDestroy(): void {

  }

}  