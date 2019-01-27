import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataParserApiService {

  @Output() change: EventEmitter<object> = new EventEmitter();
  @Output() login: EventEmitter<boolean> = new EventEmitter();

  url: string = "http://localhost:3000/pollsList";
  pollListDataInService: any[] = [];
  pollDataFinal: any[] = [];
  loginSuccessFlag: boolean = false;

  constructor(private http: Http) { }

  loginSuccess() {
    this.loginSuccessFlag = true;
    this.login.emit(this.loginSuccessFlag);
  }

  getLoginSuccess() {
    return this.loginSuccessFlag;
  }

  getPollList() {
    return this.http.get(this.url);
  }

  postPollList(pollObject) {
    return this.http.post(this.url, pollObject);
  }

  putPollList(id,pollObject) {
    return this.http.put(this.url + "/" + id, pollObject);
  }

  setDataInTable(pollList) {
    this.pollListDataInService = pollList;
  }

  getDataInTable() {
    return this.pollListDataInService
  }

  deletePollList(id) {
    return this.http.delete(this.url + '/' + id);
  }

  toggleHome(poll) {
    this.change.emit(poll);
  }

  storePollDataFinal(poll) {
    this.pollDataFinal = poll;
  }

  getPollDataFinal() {
    return this.pollDataFinal;
  }
}

