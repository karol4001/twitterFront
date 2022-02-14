import { Component, OnInit } from '@angular/core';
import { TweetsListComponent } from '../tweets-list/tweets-list.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private tweetsList: TweetsListComponent) { }

  ngOnInit(): void {
  }

  addTweet() {
    this.tweetsList.addTweet();
  }

  profileView() {
    this.tweetsList.profileView();
  }

  tweetsView() {
    this.tweetsList.ngOnInit();
  }

}
