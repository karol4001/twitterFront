import { Component, forwardRef, OnInit, NgModule } from '@angular/core';
import { TweetDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.scss'],

})
export class TweetDetailsComponent implements OnInit {

  tweet!: TweetDtoIn;
  comments!: TweetDtoIn[];

  constructor(
    private twiterService: TwiterServiceService,
    private http: HttpClient
  ) {
    this.tweet = {
      id!: 0,
      content: '',
      likes: 0,
      retweets: 0,
      comments: 0,
      username: '',
      publishingTime: ''
    }
  }

  ngOnInit(): void {
    let tweet = this.twiterService.getTweetDetails();
    // alert(JSON.stringify(tweet));
    let user = JSON.parse(localStorage.getItem('user') as string);
    if (tweet.id) {
      let btoatGen = localStorage.getItem('btoa') as string;
      let httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'authorization': 'Basic ' + btoatGen,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, DELETE'
        })
      };

      this.http.get('http://localhost:9000/api/comments/' + user.username + '/' + tweet.id).subscribe((response: any) => {
        // alert(response);
        if (response) {
          this.tweet = response.originalTweet;
          this.comments = response.tweets;
        }
        // console.log(this.tweets);
        return [];
      });
    }

  }

}
