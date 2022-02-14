import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './login/guards/auth-login.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './login/user-registration/user-registration.component';
import { MainLayoutComponent } from './tweets/main-layout/main-layout.component';
import { TweetDetailsComponent } from './tweets/tweet-details/tweet-details.component';
import { TweetsListComponent } from './tweets/tweets-list/tweets-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TweetComponent } from './tweets/tweet/tweet.component';
import { AddTweetComponent } from './tweets/add-tweet/add-tweet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MenuComponent } from './tweets/menu/menu.component';
import { UserProfileComponent } from './tweets/user-profile/user-profile.component';
import { SearchResultsComponent } from './tweets/search-results/search-results.component';
import { TwiterServiceService } from './services/twiter-service.service';
import { UserComponent } from './user/user.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserRegistrationComponent,
    MainLayoutComponent,
    TweetDetailsComponent,
    TweetsListComponent,
    TweetComponent,
    AddTweetComponent,
    MenuComponent,
    UserProfileComponent,
    SearchResultsComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [AuthGuard, DatePipe, TwiterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }    