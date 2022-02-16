import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss']
})
export class HashtagComponent implements OnInit {

  @Input('hashtagContent') hashtagContent!: string;
  @Input('name') name!: string;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
