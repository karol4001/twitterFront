import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input('name') name!: string;
  @Input('surname') surname!: string;
  @Input('username') username!: string;
  userNameIcon!: string;



  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userNameIcon = this.name.charAt(0).toUpperCase();
  }

  follow() {
    let user = JSON.parse(localStorage.getItem('user') as string);
    // let bcryptGen = localStorage.getItem('bcrypt') as string;
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'content-Type': 'application/json',
    //     'authorization': 'Basic ' + bcryptGen
    //   })
    // };
    console.log(user.username + ' obserwuje ' + this.username)

    let btoatGen = localStorage.getItem('btoa') as string;
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'authorization': 'Basic ' + btoatGen,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE'
      })
    };

    this.http.post('http://localhost:9000/api/user/' + user.username + '/follow/' + this.username, {}, httpOptions).subscribe(
      (response: any) => {
        alert(JSON.stringify(response));
      },
      (error) => {
        // alert(JSON.stringify(error));
      }
    );

  }
}
