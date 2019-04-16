import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HubService } from './hub.service';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChatComponent, 
    ChatPageComponent,
    RegisterComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: 'login',
            component: WelcomeComponent,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'logout',
        component: HomeComponent
      },
      {
        path: 'chat/:name',
        component: ChatComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent,
            pathMatch: 'full',
          },
          //{
          //  path: 'chatpage',
          //  component: ChatPageComponent,
          //  pathMatch: 'full',
          //}
          {
            path: ':name/:Id',
            component: ChatPageComponent,
            pathMatch: 'full',
          }
        ]

      }    
    ])
  ],
  providers: [AppService, HubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
