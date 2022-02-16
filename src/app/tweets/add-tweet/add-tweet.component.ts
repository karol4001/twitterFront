import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TwiterServiceService } from 'src/app/services/twiter-service.service';
import { Subject } from 'rxjs';
import { TweetsListComponent } from '../tweets-list/tweets-list.component';
import { MenuServiceService } from 'src/app/services/menu-service.service';


@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})

export class AddTweetComponent implements OnInit {

  @Input() addTweetFlag: boolean = false;
  content!: string;
  shortLink: string = '';
  loading: boolean = false;
  @Input('file') file!: File;

  subjectNotifier: Subject<null> = new Subject<null>();
  @ViewChild("mytextarea") set bannerNoteRef(ref: any) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  constructor(
    private twiterService: TwiterServiceService,
    private tweetsList: TweetsListComponent,
    private menuService: MenuServiceService
  ) { }

  ngOnInit(): void {
    this.menuService.getAddTweetStatus().subscribe((value) => {
      this.addTweetFlag = value;
    });
    console.log('addTweetStatus: ' + this.addTweetFlag);
    this.content = '';
  }

  addNewTweet() {
    this.menuService.setAddTweetStatus(false);
    localStorage.removeItem('addNewTweetFlag');
    console.log('new tweet: ' + this.content);
    this.twiterService.addTweet(this.content);

  }

  cancelNewTweet() {
    this.addTweetFlag = false;
    localStorage.removeItem('addNewTweetFlag');
  }

  onUpload() {
    this.loading = !this.loading;
    // console.log('cfbdfbdfbdfbdfbdfbdf' + this.file);
    // this.twiterService.upload(this.file);
    // this.twiterService.upload(this.file).subscribe((event: any) => {
    //   if (typeof (event) === 'object') {
    //     this.shortLink = event.link;
    //     this.loading = false;
    //   }
    // });
  }

}
