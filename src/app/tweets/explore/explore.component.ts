import { Component, OnInit } from '@angular/core';
import { HashtagComponent } from './hashtag/hashtag.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDtoIn } from 'src/app/model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  hashtags!: string[];
  users!: UserDtoIn[];

  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    let username = localStorage.getItem('username') as string;
    let btoatGen = localStorage.getItem('btoa') as string;
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'authorization': 'Basic ' + btoatGen,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE'
      })
    };

    this.http.get('http://localhost:9000/api/hashtags/popular', httpOptions).subscribe((hashtags: any) => {
      this.hashtags = hashtags;
      console.log(this.hashtags);
      return this.hashtags;
    });

    let searchWord = 'a';
    this.http.get('http://localhost:9000/api/search/user/' + searchWord, httpOptions).subscribe((users: any) => {
      this.users = users;
      return this.users;
    });
  }

}
