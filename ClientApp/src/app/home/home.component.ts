import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../model/user';
import { HubService } from '../hub.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private _appService: AppService, private router: Router, private _hubService: HubService) { }

  model = new User;
  Users: User[];
  name: boolean;
  sender: string;
  password: string;

  //signupfrm: FormGroup;

  ngOnInit() {

    //this._appService.getUsers().subscribe((data: any) => this.Users)
  }


  onSubmit(form: any) {

    this.sender = this.model.UserName;
    this.password = this.model.Password;
    this._appService.senderAdd(this.model.UserName);

    this._appService.getUserByName(this.model.UserName).subscribe((data: any) => {

      if (this.sender == data.userName && this.password == data.password) {
        this.router.navigate(['/chat/', this.model.UserName])
      }
      else {
        alert("please register..");
      }
    });

    console.log("sender:" + this.sender);
    console.log(this.model);
    //this._appService.addUser(this.model).then((result)=> {
    //  this.router.navigate(['/chat/', result.id]);
    //});
    //console.log(this.model);
    //this.router.navigate(['/chat/', this.model.UserName]);
  }
}

