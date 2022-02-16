import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  invokeTweetsListFunction = new EventEmitter();
  subsVar!: Subscription;

  menuStatus!: BehaviorSubject<boolean>;

  addTweetStatus!: BehaviorSubject<boolean>;

  constructor() {
    this.menuStatus = new BehaviorSubject<boolean>(false);
    this.addTweetStatus = new BehaviorSubject<boolean>(false);
  }

  getMenuStatus(): Observable<boolean> {
    return this.menuStatus.asObservable();
  }
  setMenuStatus(newValue: boolean): void {
    this.menuStatus.next(newValue);
  }

  getAddTweetStatus(): Observable<boolean> {
    return this.addTweetStatus.asObservable();
  }
  setAddTweetStatus(newValue: boolean): void {
    this.addTweetStatus.next(newValue);
  }

  addTweet() {
    this.invokeTweetsListFunction.emit();
  }
}


