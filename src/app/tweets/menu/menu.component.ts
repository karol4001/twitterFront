import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { MenuServiceService } from 'src/app/services/menu-service.service';
import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('50ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('50ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  menuOnFlag!: boolean;

  @ViewChild("menu") set bannerNoteRef(ref: any) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  constructor(private router: Router, private twitterService: TwiterServiceService, private menuService: MenuServiceService) { }

  ngOnInit(): void {
    this.menuService.getMenuStatus().subscribe((value) => {
      this.menuOnFlag = value;
    });

    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.menuOnFlag = true;
      console.log('menu status: visible');
    } else {
      this.menuOnFlag = false;
      console.log('menu OFF');
    }
  }

  addTweet() {
    this.router.navigate(['/home']);
    // this.menuService.addTweet();
    this.menuService.setAddTweetStatus(true);
  }

  profileView() {
    this.router.navigate(['/profile']);
  }

  tweetsView() {
    this.router.navigate(['/home']);
    this.router.navigateByUrl("/profile", { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  exploreView() {
    this.router.navigate(['/explore']);
  }



}
