import { Component, OnInit } from '@angular/core';
import { TweetDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.scss']
})
export class TweetDetailsComponent implements OnInit {

  tweet!: TweetDtoIn;
  comments!: TweetDtoIn[];

  constructor(
    private twiterService: TwiterServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let tweet = this.twiterService.getTweetDetails();
    this.http.get('http://localhost:9000/api/comments/1').subscribe((response: any) => {
      alert(response);
      this.tweet = response.originalTweet;
      this.comments = response.tweets;
      // console.log(this.tweets);
      return [];
    });
  }

}
