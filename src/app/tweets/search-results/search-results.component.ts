import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TweetDtoIn, UserDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, Subscription, take, tap, timeout } from 'rxjs';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public usersView: Subject<boolean> = new Subject();
  public tweetsView: Subject<boolean> = new Subject();
  test!: boolean;

  public userTweets: TweetDtoIn[] = [];
  public tweetTweets: TweetDtoIn[] = [];
  public users: UserDtoIn[] = [];

  clickSearchSubscription!: Subscription;

  @ViewChild('usersRes', { read: ElementRef }) usersRes!: ElementRef;

  constructor(
    private http: HttpClient,
    private twitterService: TwiterServiceService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.getValue();
  }

  getValue() {
    this.clickSearchSubscription = this.twitterService.getSearchClickEvent().pipe(take(1)).subscribe(res => {
      this.test = res;
      console.log('sub' + this.test + this.usersView.observed + this.tweetsView.observed);
      if (this.test && this.usersView.observed && !this.tweetsView.observed) {
        this.resultsViewUsers();
      } else if (this.test && !this.usersView.observed && this.tweetsView.observed) {
        this.resultsViewTweets();
      } else {
        this.resultsViewUsers();
      }
    });
  }

  ngOnInit(): void {
    this.getValue();
    this.changeDetectorRef.detectChanges();
  }

  resultsViewTweets() {
    this.ngOnInit();
    console.log('tweets results');
    this.tweetsView.next(true);
    this.usersView.next(false);
    this.tweetTweets = [];
    let searchWord = localStorage.getItem('searchWord') as string;
    this.http.get('http://localhost:9000/api/search/tweet/' + searchWord).subscribe((tweets: any) => {
      this.userTweets = tweets;
      return this.userTweets;
    });
  }

  public resultsViewUsers() {
    // this.tweetTweets = this.twitterService.getLocalTweets();
    let searchWord = localStorage.getItem('searchWord') as string;
    this.http.get('http://localhost:9000/api/search/user/' + searchWord).subscribe((users: any) => {
      this.users = users;
      return this.users;
    });
    console.log('users results');
    this.tweetsView.next(false);
    this.usersView.next(true);
    console.log('tweets-res: ' + this.tweetsView + ', users-res: ' + this.usersView);
    console.log(this.tweetTweets);
    this.ngOnInit();
  }

  ngOnDestroy(): void {

  }

}
