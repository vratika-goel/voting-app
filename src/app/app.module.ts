import { DataParserApiService } from './services/data-parser-api.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';
import { RouterModule } from '@angular/Router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { VoteCarouselComponent } from './vote-carousel/vote-carousel.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PollsListComponent } from './polls-list/polls-list.component';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollsListComponent,
    VoteCarouselComponent,
    ViewPollsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot([
    {
      path: 'polls-list',
      component: PollsListComponent
    },
    {
      path: 'view-polls',
      component: ViewPollsComponent
    }
  ])
  ],
  providers: [
    DataParserApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
