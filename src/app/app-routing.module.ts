import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './login/guards/auth-login.guard';
import { UserRegistrationComponent } from './login/user-registration/user-registration.component';
import { MainLayoutComponent } from './tweets/main-layout/main-layout.component';
import { TweetDetailsComponent } from './tweets/tweet-details/tweet-details.component';
import { UserProfileComponent } from './tweets/user-profile/user-profile.component';
import { MenuComponent } from './tweets/menu/menu.component';
import { ExploreComponent } from './tweets/explore/explore.component';
import { BookmarksComponent } from './tweets/bookmarks/bookmarks.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'home', component: MainLayoutComponent, canActivate: [AuthGuard] },
  {
    path: 'profile', component: UserProfileComponent, children: [
      {
        path: '',
        component: MenuComponent
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'explore', component: ExploreComponent, children: [
      {
        path: '',
        component: MenuComponent
      }
    ], canActivate: [AuthGuard]
  },
  { path: 'tweet-details', component: TweetDetailsComponent, canActivate: [AuthGuard] },
  {
    path: 'bookmarks', component: BookmarksComponent, children: [
      {
        path: '',
        component: MenuComponent
      }
    ], canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }