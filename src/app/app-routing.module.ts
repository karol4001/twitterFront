import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { AuthGuard } from './login/guards/auth-login.guard';
import { UserRegistrationComponent } from './login/user-registration/user-registration.component';
import { MainLayoutComponent } from './tweets/main-layout/main-layout.component';
import { TweetDetailsComponent } from './tweets/tweet-details/tweet-details.component';
import { TweetsListComponent } from './tweets/tweets-list/tweets-list.component';
import { SearchResultsComponent } from './tweets/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'home', component: MainLayoutComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }