import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public name: string;
  public surname: string;
  public username!: string;
  public joined!: string;
  public following!: number;
  public followers!: number;

  constructor(private datePipe: DatePipe) {
    this.name = localStorage.getItem('name') as string;
    this.surname = localStorage.getItem('surname') as string;
    this.username = localStorage.getItem('username') as string;
    this.joined = localStorage.getItem('joined') as string;
    this.following = 5;
    this.followers = 7;
  }

  ngOnInit(): void {
  }

}
