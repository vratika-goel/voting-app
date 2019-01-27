import { DataParserApiService } from './../services/data-parser-api.service';
import { FormGroup, FormControl, Validators } from '@angular/Forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  incorrectPwd: boolean = false;
  unknownUser: boolean = false;
  loginTrue: boolean = false;

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private service: DataParserApiService) { }

  ngOnInit() {
  }

  onSubmit(e) {
    if(this.form.valid) {
      if(this.form.value.user === "Admin" && this.form.value.password === "Admin") {
        this.loginTrue = true;
        this.service.loginSuccess();
      }
      else {
        this.incorrectPwd = true;
        this.unknownUser = true;
      }
    }
  }

  get user() {
    return this.form.get('user');
  }

  get password() {
    return this.form.get('password');
  }
}
