import { Injectable, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet, TweetDtoIn, TweetDtoOut, User } from '../model';
import { DatePipe } from '@angular/common';

import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwiterServiceService {

  @Input('tweets') tweets: TweetDtoIn[] = [];
  user!: User;
  newTweet: TweetDtoOut = new TweetDtoOut;
  private subject = new Subject<boolean>();

  baseApiUrl = 'http://localhost:9000/api/upload';

  testTweets: TweetDtoIn[] = [
    {
      id: 5,
      username: 'Clint',
      content: 'Twitter – serwis społecznościowy udostępniający usługę mikroblogowania uruchomiony 21 marca 2006',
      publishingTime: '01-05-2022 14:36:01',
      likes: 5,
      retweets: 12,
      comments: 8

    },
    {
      id: 24,
      username: 'Clint',
      content: 'Twitter – serwis społecznościowy udostępniający usługę mikroblogowania uruchomiony 21 marca 2006',
      publishingTime: '01-05-2022 14:36:05',
      likes: 5,
      retweets: 12,
      comments: 8
    }
  ]

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  loadTweets(): TweetDtoIn[] {
    this.http.get('http://localhost:9000/api/1').subscribe((tweets: any) => {
      this.tweets = tweets;
      console.log(this.tweets);
      return this.tweets;
    });

    // this.tweets = this.testTweets;
    console.log(this.tweets);
    return this.tweets;
  }

  getAllTweets(): TweetDtoIn[] {
    return this.tweets;
  }

  getLocalTweets(): TweetDtoIn[] {
    return this.testTweets;
  }

  addTweet(content: string) {
    // let numberOfTweets = this.tweets.length;
    // let tweetId = Number.parseInt(this.tweets[numberOfTweets - 1].tweetId) + 1;
    // let publishingTime = this.datepipe.transform(new Date, 'MM-dd-yyyy hh:mm:ss') as string;
    // let userName = localStorage.getItem('userName') as string;
    // this.tweets.push({ tweetId, content, publishingTime, userName });

    this.newTweet.content = content;
    this.newTweet.author = 1;

    this.http.post('http://localhost:9000/api/1', this.newTweet).subscribe(
      (response: any) => {
        alert(JSON.stringify(response));
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );

    this.loadTweets();
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  // onTweetListButtonSearchClick() {
  //   this.invokeSearch.emit();
  // }

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

}
