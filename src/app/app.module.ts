import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RootComponent } from './root.component';
import { SlackComponent } from './components/slack/slack.component';
import { WebSocketService } from './services/websocket.service';
import { SlackService } from './services/slack.service';
import { MessagePipe } from './pipes/message.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: ':regex', component: SlackComponent },
      { path: '**', component: SlackComponent }
    ]),
    HttpModule
  ],
  declarations: [
    SlackComponent,
    RootComponent,
    MessagePipe
  ],
  providers: [
    SlackService,
    WebSocketService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
