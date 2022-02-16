import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { HttpClient } from '@angular/common/http';
import { TweetsListComponent } from '../tweets-list/tweets-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input('id') id!: number;
  @Input('username') username!: string;
  @Input('content') content!: string;
  @Input('publishingTime') publishingTime!: any;
  @Input('likes') likes: any = 0;
  @Input('retweets') retweets: any = 0;
  @Input('comments') comments: any = 0;


  userNameIcone!: string;
  name!: string;
  surname!: string;
  userLogin!: string;

  @ViewChild('truncator', { static: true }) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private datePipe: DatePipe,
    private twiterService: TwiterServiceService,
    private http: HttpClient, private tweetsList: TweetsListComponent,
    private router: Router) {
  }

  ngOnInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
    this.userNameIcone = this.username.charAt(0).toUpperCase();
    this.name = localStorage.getItem('name') as string;
    this.surname = localStorage.getItem('surname') as string;
    this.userLogin = localStorage.getItem('username') as string;
    this.publishingTime = this.datePipe.transform(this.publishingTime, 'MMM dd');
  }

  addTweetLike() {
    this.http.post('http://localhost:9000/api/tweet/like/' + this.id, '').subscribe(
      (response: any) => {
        // alert(JSON.stringify(response));
      },
      (error) => {
        // alert(JSON.stringify(error));
      }
    );
    this.tweetsList.ngOnInit();
  }

  tweetDetails() {

    let tweet = {
      id: this.id,
      content: this.content,
      likes: this.likes,
      retweets: this.retweets,
      comments: this.comments,
      username: this.username,
      publishingTime: this.publishingTime
    }

    this.twiterService.tweetDetails(tweet)
    this.router.navigate(['tweet-details']);
  }

}
