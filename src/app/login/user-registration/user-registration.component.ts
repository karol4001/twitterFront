import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from './validation';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        username: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('submitted');
    console.log(this.form.errors);
    alert(JSON.stringify(this.form.value));
    this.http.post('http://localhost:9000/api/user/add', this.form.value).subscribe(
      (response: any) => {
        alert(JSON.stringify(response));
      },
      (error) => {
        // alert(JSON.stringify(error));
      }
    );
    console.log('New user information: ' + JSON.stringify(this.form.value));
    this.router.navigate(['']);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  cancel() {
    this.router.navigate(['']);
  }
}