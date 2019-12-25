import { UserPageComponent } from './components/user-page/user-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GithubLoginComponent } from './components/github-login/github-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPageComponent },
  { path: 'github-login', component: GithubLoginComponent },
  { path: 'user', component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
