import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../model/user';
import { HubService } from '../hub.service';
import { Message } from '../model/Message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  csenderId: number;
  sender: string;
  model = new User();
  status: boolean;

  private Date;
  message = '';
  messages: string[] = [];
  msgHistory: string[] = [];
  msgModel = new Message;
  senderModel = new User;

  constructor(private route: ActivatedRoute, private router: Router, private _appService: AppService, private _hubService: HubService) {

    //this.senderId = this.route.snapshot.params['name'];
    //console.log("sender id:" + this.senderId);
    //this._appService.addConnId(this.senderId);

  }

  ngOnInit() {
    this.sender = this._appService.getSenderName();
    console.log("sender:" + this.sender);
    this.status = true;
    this._hubService.getConnId(this.sender);
    this._hubService.setStatus(this.sender, this.status);

    //this._appService.getUserById(this.senderId).subscribe((data: any) => { this.model = data, console.log(this.model) });


    this._appService.getMessages().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i].sender);
        if ((this.sender == data[i].sender && this.sender == data[i].receiver)) {


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


        }
      }
      //console.log(data);
    });

  }

  public sendMessage(): void {

    this.msgModel.Sender = this.sender;
    this.msgModel.Receiver = this.sender;
    this.msgModel.Message = this.message;

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
        this.messages = [];
      this.messages = this._hubService.sendToMe(this.sender, this.senderModel.connId, this.message, newDate);

      this.message = '';
      //console.log(this.messages);
    });


  }

}
