import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

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
    private http: HttpClient,
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
    if (this.username) {
      this.userNameIcone = this.username.charAt(0).toUpperCase();
    }

    this.name = localStorage.getItem('name') as string;
    this.surname = localStorage.getItem('surname') as string;
    this.userLogin = localStorage.getItem('username') as string;
    this.publishingTime = this.datePipe.transform(this.publishingTime, 'MMM dd');
  }

  addTweetLike() {
    let btoatGen = localStorage.getItem('btoa') as string;
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'authorization': 'Basic ' + btoatGen,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE'
      })
    };

    let user = JSON.parse(localStorage.getItem('user') as string);
    this.http.post('http://localhost:9000/api/tweet/like/' + user.username + '/' + this.id, '').subscribe(
      (response: any) => {
        // alert(JSON.stringify(response));
      },
      (error) => {
        // alert(JSON.stringify(error));
      }
    );
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



