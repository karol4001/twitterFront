import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks: BookmarkComponent[] = [];

  constructor(
    private http: HttpClient
  ) { }

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

    this.http.get('http://localhost:9000/api/bookmarklist', httpOptions).subscribe((bookmarks: any) => {
      this.bookmarks = bookmarks;
      // console.log(this.tweets);

      return this.bookmarks;
    });
  }

}
