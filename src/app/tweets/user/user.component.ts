import { Component, OnInit, Input } from '@angular/core';

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



  constructor() { }

  ngOnInit(): void {
    this.userNameIcon = this.name.charAt(0).toUpperCase();
  }

}
