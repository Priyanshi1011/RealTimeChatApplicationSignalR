import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AppService } from '../app.service';
import { User } from '../model/user';
import { HubService } from '../hub.service';
import { Message } from '../model/Message';
import { forEach } from '@angular/router/src/utils/collection';
import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";
import { CommentStmt } from '@angular/compiler';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  receiverId: number;
  sender: string;
  senderId: number;
  receiver: string;
  model = new User;
  senderModel = new User;
  msgModel = new Message;

  constructor(private route: ActivatedRoute, private router: Router, private _appService: AppService, private _hubService: HubService) {

    this.receiver = this.route.snapshot.params['name'];
    console.log("receiver:" + this.receiver);

    this.receiverId = this.route.snapshot.params['Id'];
    console.log("receiverId:" + this.receiverId);

  }

  private Date;
  message = '';
  messages: string[] = [];
  msgHistory: string[] = [];


  ngOnInit() {

    this.sender = this._appService.getSenderName();
    console.log("sender:" + this.sender);

    //this.senderId = this._appService.getConnId();
    //console.log("connid:" + this.senderId);

    //this._appService.getUserByName(this.receiver).subscribe((data: any) => {
    //  this.model = data, console.log(this.model);
    //    if (data.connected == false) {
    //      this.msgModel.Unread = true;
    //     // console.log(data.connected);
    //     // console.log(this.msgModel.Unread);
    //  }
    //});

    this._appService.getMessages().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i].sender);
        if ((this.sender == data[i].sender || this.sender == data[i].receiver) && (this.receiver == data[i].receiver || this.receiver == data[i].sender)) {


          console.log(data[i]);
          var date = new Date(data[i].dateTime);
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var seconds = date.getSeconds();
          var newDate = hours + ":" + minutes + ":" + seconds + " " + day + "-" + (monthIndex + 1) + "-" + year;

          // console.log(newDate);
          this.msgHistory.push(`${data[i].sender}:${data[i].message},${newDate}`);

          if (data[i].unread === true) {
            if (data[i].sender == this.receiver && data[i].receiver == this.sender) {
              console.log(data[i]);
              data[i].unread = false;
              this._appService.modifyMessage(data[i].id, data[i]).subscribe((data: any) => console.log(data));
            }
          }


        }
      }
      //console.log(data);
    });

  }

  public sendMessage(): void {

    this.msgModel.Sender = this.sender;
    this.msgModel.Receiver = this.receiver;
    this.msgModel.Message = this.message;
    this.msgModel.Unread = true;
    this.Date = new Date().toLocaleString();

    this.msgModel.dateTime = this.Date;
    //console.log(this.msgModel.dateTime);
    console.log(this.msgModel);

    this._appService.addMessage(this.msgModel).subscribe((data: any) => console.log(data));

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var newDate = hours + ":" + minutes + ":" + seconds + " " + day + "-" + (monthIndex + 1) + "-" + year;

    this._appService.getUserByName(this.sender).subscribe((data: any) => {
      this.senderModel = data, console.log(this.model),

        this.messages = this._hubService.sendMessage(this.sender, this.receiver, this.senderModel.connId, this.model.connId, this.message, newDate);

      this.message = '';
      //console.log(this.messages);
    });





  }

}
