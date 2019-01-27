import { DataParserApiService } from '../services/data-parser-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FormGroup, FormControl, Validators } from '@angular/Forms';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastId: number;
  pollList: any[] = [];
  data: any[] = [];
  viewFlag: boolean = true;
  loginTrue: boolean = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private pollsList: DataParserApiService) {
    this.loginTrue = false;
  }

  ngOnInit() {
    this.viewFlag = true;
    this.pollsList.login.subscribe(loginFlag => {
      if (loginFlag) {
        this.loginTrue = true;
      }
    })
    this.pollsList.getPollList().subscribe(data => {
      console.log(data.json());
      this.pollList = data.json();
    })
    this.pollsList.change.subscribe(poll => {
      console.log("Poll List to display", poll);
      if (poll != undefined) {
        this.viewFlag = false;
      }
    })
    console.log("this . data in init", this.data);

  }

  get title() {
    return this.form.get('title');
  }

  get name() {
    return this.form.get('name');
  }

  onSubmit(e) {
    console.log(this.form);
    var existingTitleCounter = 0;
    var existingTitleId = 0;
    for (var j = 0; j < this.pollList.length; j++) {
      if (this.form.value.title.toLowerCase() === this.pollList[j].title.toLowerCase()) {
        existingTitleCounter = existingTitleCounter + 1;
        existingTitleId = j;
      }
    }
    if (existingTitleCounter == 0) {
      var objToPost = {};
      var arrName = [{ "nameOf": this.form.value.name, "noOfVotes": 0 }];
      objToPost['id'] = this.pollList[this.pollList.length - 1].id + 1;
      objToPost['name'] = arrName;
      objToPost['title'] = this.form.value.title;
      console.log("Object to post", objToPost);
      this.pollsList.postPollList(objToPost)
        .subscribe(response => {
          var resp = response.json();
          console.log("Response", resp);
          this.pollList.push(resp);
          this.pollsList.setDataInTable(this.pollList);
          this.router.navigate(['/polls-list']);
        })
    }
    else {
      var objToPut = this.pollList[existingTitleId];
      objToPut.name.push({ "nameOf": this.form.value.name, "noOfVotes": 0 });
      this.pollList[existingTitleId] = objToPut;
      this.pollsList.setDataInTable(this.pollList);
      console.log("Object to put", objToPut);
      this.pollsList.putPollList(existingTitleId, objToPut)
        .subscribe(response => {
          console.log("Put resp", response.json());
          this.router.navigate(['/polls-list']);
        });
    }
  }

}
