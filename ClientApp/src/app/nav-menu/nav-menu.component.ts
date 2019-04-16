import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { IUser, User } from '../model/user';
import { AppService } from '../app.service';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private _appService: AppService, private route: Router, private _hubService: HubService) { }

  Users: User[];
  interval: any;
  sender: string;
  msgCount: number = 0;
  msgSender: string;
  msgUnread: number = 0;
  count: number = 0;
  msgArray: string[] = [];

  ngOnInit() {

    this._appService.getUsers().subscribe((data: any) => {
      this.Users = data
      // console.log(this.Users);
    });



    this.sender = this._appService.getSenderName();

    this._appService.getMessages().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i].sender);
        if (data[i].unread === true) {
          // console.log(data[i]);
          if (data[i].receiver == this.sender) {
            console.log(data[i].sender);
            let msgSender = data[i].sender;
            this.msgArray.push(data[i].sender);

          }
        }

      }
      this.messageCount();
    }

      //console.log(data);
    );

    this.interval = setInterval(() => {

      this._appService.getUsers().subscribe((data: any) => {
        this.Users = data
        // console.log(this.Users);



        // this.messageCount();
      });
    }, 10000);

    console.log(this.msgArray);
  }

  logout() {
    var a = confirm("do you want to logout???");

    if (a) {
      this._hubService.removeStatus(this.sender);
      this.route.navigate(['/logout']);
    }

  }

  //removeNotification(userName) {
  //  var a = this.Users.find(x => x.userName === userName);
  //  a.count = 0;
  //  console.log(a);

  //}

  chatPage(userName, id) {
    console.log("inside navigation");
    if (this.sender == userName) {
      this.route.navigate(['/chat/', this.sender]);
    } else {
      this.route.navigate(['/chat/' + this.sender + '/' + userName + '/' + id]);
    }
    var a = this.Users.find(x => x.UserName === userName);
    a.count = 0;

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  messageCount() {

    var map = this.msgArray.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    console.log(map);

    for (let key in map) {
      //let value = map[key];
      console.log(key);
      for (var i = 0; i < this.Users.length; i++) {
        if (key == this.Users[i].UserName) {
          this.Users[i].count = map[key];
          console.log(this.Users[i].UserName + ":" + map[key]);
          console.log(this.Users[i]);
        }
      }
    }


    //for (var i = 0; i < this.msgArray.length; i++) {

    //  var count = 1;
    //  for (var j = i + 1; j < this.msgArray.length; j++) {
    //    if (this.msgArray[i] === this.msgArray[j]) {
    //      count = count + 1;
    //    }
    //  }
    //  console.log(this.msgArray[i] + "=" + count);
    //}

    //this.msgUnread = this.msgUnread + 1;
    //let a = this.Users.find(x => x.userName === msgSender);
    //a.count = a.count + this.msgUnread;
    //console.log(a.count);
    //this.count = this.count + this.msgUnread;
    //a.count = this.count;
    //console.log(a.userName+":"+a.count);
    //this.msgUnread = 0;
  }
}
