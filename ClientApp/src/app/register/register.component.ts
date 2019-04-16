import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AppService]
})
export class RegisterComponent implements OnInit {

  constructor(private _appService: AppService, private router: Router) { }

  model = new User;
  registrationForm: FormGroup;
  public resmessage: string;
  //userName: string;
  //password: string;

  ngOnInit() {
  }

  onSubmit(form: any) {
    this._appService.addUser(this.model).subscribe((result) => {
      this.router.navigate(['/login']);
    });
    //if (this.registrationForm.invalid) {
    //  return;
    //}
  }
  //addUser() {
  //  this._appService.addUser(this.registrationForm.value)
  //    .subscribe(response => {
  //      //console.log(response)  
  //      this.resmessage = response;
  //      //this.getAll();
  //      this.router.navigate(['/login']);
  //    }, error => {
  //      console.log(error);
  //    });
  //}

}
