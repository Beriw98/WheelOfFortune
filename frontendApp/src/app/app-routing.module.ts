import { NgModule } from '@angular/core';
import { GameComponent } from './game-page/game.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { MyProfileStatisticsComponent } from './my-profile-statistics/my-profile-statistics.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'login', component: LogInPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profile', component: MyProfilePageComponent },
  { path: 'friends', component: MyFriendsComponent },
  { path: 'statistics', component: MyProfileStatisticsComponent },
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
