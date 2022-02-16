import { Injectable, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet, TweetDtoIn, TweetDtoOut, User, UserDtoIn } from '../model';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TwiterServiceService {

  @Input('tweets') tweets: TweetDtoIn[] = [];
  // user: UserDtoIn;
  newTweet: TweetDtoOut = new TweetDtoOut;
  private subject = new Subject<boolean>();
  tweet!: TweetDtoIn;
  private loadTwittsStatus: BehaviorSubject<boolean>;
  private loadTwittsFinished: boolean;

  baseApiUrl = 'http://localhost:9000/api/user/' + localStorage.getItem('username');

  constructor(
    private http: HttpClient,
    private datepipe: DatePipe,
    private router: Router) {
    this.loadTwittsStatus = new BehaviorSubject<boolean>(false);
    this.loadTwittsFinished = false;
  }

  getLoadTweetsStatus(): Observable<boolean> {
    return this.loadTwittsStatus.asObservable();
  }
  setLoadTweetsStatus(newValue: boolean): void {
    this.loadTwittsStatus.next(newValue);
    if (this.loadTwittsStatus.observed == true) {
      this.loadTweets();
    }
  }

  loadTweets(): TweetDtoIn[] {
    if (!this.loadTwittsFinished) {
      this.http.get(this.baseApiUrl).subscribe((tweets: any) => {
        this.tweets = tweets;
        // alert(this.tweets);
        this.loadTwittsFinished = true;
        return this.tweets;
      });
    }

    return [];
  }


  addTweet(content: string) {
    let user: UserDtoIn = JSON.parse(localStorage.getItem('user') as string);
    this.newTweet.content = content;
    this.newTweet.author = user.id;
    console.log('new tweet: ' + this.newTweet)
    alert('user id: ' + user.id);
    this.http.post('http://localhost:9000/api/' + user.id, this.newTweet).subscribe(
      (response: any) => {
        console.log(JSON.stringify(response));
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  searchClickEvent() {
    this.subject.next(true);
    this.subject.subscribe(() => {
    });
    console.log('getSearch: ' + this.subject.observed);
  }

  getSearchClickEvent(): Observable<any> {
    console.log('getSearch2: ' + this.subject.observed);
    return this.subject.asObservable();
  }

  getSearchHelper(): boolean {
    let data = this.subject.observed;
    return true;
  }

  async upload(file: File) {
    // const formData = new FormData();
    // formData.append('fileupload', file);
    // formData.append(' userName', localStorage.getItem('userName') as string);
    // console.log(file);
    // return this.http.post(this.baseApiUrl, formData );
    const form = new FormData();
    form.append("file", file);
    const requestOptions: RequestInit = {
      method: "POST",
      body: form
    };

    await fetch(this.baseApiUrl, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  }

  tweetDetails(tweet: TweetDtoIn) {
    this.tweet = tweet;
  }

  getTweetDetails(): TweetDtoIn {
    return this.tweet;
  }

}
