import { Component, OnInit } from '@angular/core';
import { HashtagComponent } from './hashtag/hashtag.component';
import { HttpClient } from '@angular/common/http';
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
    this.http.get('http://localhost:9000/api/hashtags/popular').subscribe((hashtags: any) => {
      this.hashtags = hashtags;
      console.log(this.hashtags);
      return this.hashtags;
    });

    let searchWord = 'a';
    this.http.get('http://localhost:9000/api/search/user/' + searchWord).subscribe((users: any) => {
      this.users = users;
      return this.users;
    });
  }

}
