import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from './tweets/menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twitter';

  @ViewChild('menu') menu!: MenuComponent;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }
}


