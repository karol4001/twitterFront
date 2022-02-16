import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TweetsListComponent } from '../tweets-list/tweets-list.component';
import { AuthGuard } from 'src/app/login/guards/auth-login.guard';
import { AuthLoginService } from 'src/app/login/services/auth-login.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(private login: AuthGuard, private authguard: AuthLoginService) { }

  ngOnInit(): void {
    if (!this.login.isLoggedIn()) {
      this.authguard.logout();
    }

  }

  ngOnDestroy(): void {
  }
}
