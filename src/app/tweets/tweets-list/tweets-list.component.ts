import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Tweet, TweetDtoIn } from 'src/app/model';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { AddTweetComponent } from '../add-tweet/add-tweet.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.scss']
})
export class TweetsListComponent implements OnInit {

  public addTweetFlag: boolean = false;
  public searchWord!: string;
  public tweets: TweetDtoIn[] = [];
  profileVisible: boolean = false;
  tweetsVisible: boolean = true;
  searchResultsVisible: boolean = false;

  @ViewChild('addTweetWindow') addTweetWindow!: AddTweetComponent;
  constructor(private twiterService: TwiterServiceService, private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.twiterService.loadTweets();
    // this.tweets = this.twiterService.getAllTweets();
    this.profileVisible = false;
    this.tweetsVisible = true;
    this.searchResultsVisible = false;
    let username = localStorage.getItem('username') as string;
    this.http.get('http://localhost:9000/api/user/' + username).subscribe((tweets: any) => {
      this.tweets = tweets;
      // console.log(this.tweets);
      return this.tweets;
    });
  }

  addTweet() {
    // this.addTweetFlag=true;
    localStorage.setItem('addNewTweetFlag', 'add');
    this.addTweetWindow.ngOnInit();
    console.log('addTweet setItem add');
  }

  search() {
    // this.http.post('http://localhost:9000/api/search/' + this.searchWord, '').subscribe(
    //   (response: any) => {
    //     // alert(JSON.stringify(response));
    //   },
    //   (error) => {
    //     // alert(JSON.stringify(error));
    //   }
    // );

    this.profileVisible = false;
    this.tweetsVisible = false;
    this.searchResultsVisible = true;
    localStorage.setItem('searchWord', this.searchWord);
    console.log('search word: ' + this.searchWord);
    // this.searchResults.ngOnInit();
    // czyszczenie wpisanego słowa w input search
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    this.twiterService.searchClickEvent();
    // this.searchResults.resultsViewUsers();

    // this.searchResults.tweetsResultsView = true;

  }

  profileView() {
    this.profileVisible = true;
    this.tweetsVisible = false;
    this.searchResultsVisible = false;
    localStorage.removeItem('addNewTweetFlag');
  }



}
