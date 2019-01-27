import { FormGroup, FormControl } from '@angular/Forms';
import { Router } from "@angular/Router";
import { Component, OnInit } from "@angular/core";
import { DataParserApiService } from "../services/data-parser-api.service";


@Component({
  selector: "app-view-polls",
  templateUrl: "./view-polls.component.html",
  styleUrls: ["./view-polls.component.css"]
})
export class ViewPollsComponent implements OnInit {
  dataToDisplay: any = {};
  nameListToDisplay: any[] = [];
  voteListToDisplay: any[] = [];
  pieChartData: any[] = [];

  form = new FormGroup({
    voteFor: new FormControl('')
  })

  constructor(private router: Router, private pollsListService: DataParserApiService) { }

  pieChartOptions = {
    responsive: true
  };

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: [
        "rgba(30, 169, 224, 0.8)",
        "rgba(255,165,0,0.9)",
        "rgba(139, 136, 136, 0.9)"
      ]
    }
  ];

  ngOnInit() {
    this.nameListToDisplay = [];
    this.voteListToDisplay = [];
    this.dataToDisplay = this.pollsListService.getPollDataFinal();
    console.log("data view", this.dataToDisplay);
    console.log("data view entries", this.dataToDisplay.name);
    for (var i = 0; i < this.dataToDisplay.name.length; i++) {
      this.nameListToDisplay.push(this.dataToDisplay.name[i].nameOf);
      this.voteListToDisplay.push(this.dataToDisplay.name[i].noOfVotes)
    }
    this.pieChartData = [
      {
        data: this.voteListToDisplay
      }
    ];
  }

  onSubmit() {
    this.nameListToDisplay = [];
    this.voteListToDisplay = [];
    console.log(this.form);
    var id = this.dataToDisplay.id;
    for (var i = 0; i < this.dataToDisplay.name.length; i++) {
      if (this.form.value.voteFor === this.dataToDisplay.name[i].nameOf) {
        this.dataToDisplay.name[i].noOfVotes = this.dataToDisplay.name[i].noOfVotes + 1;
      }
    }
    console.log(this.dataToDisplay);
    this.pollsListService.putPollList(id, this.dataToDisplay)
      .subscribe(response => {
        var resp = response.json();
        console.log("Put resp", response.json());
        for (var i = 0; i < resp.name.length; i++) {
          this.nameListToDisplay.push(resp.name[i].nameOf);
          this.voteListToDisplay.push(resp.name[i].noOfVotes)
        }
        this.pieChartData = [
          {
            data: this.voteListToDisplay
          }
        ];
        this.pieChartColor.backgroundColor.push(this.getRandomColor);
      })
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color = color + letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // _backToList() {
  //   this.router.navigate(["/polls-list"]);
  // }

  get voteFor() {
    return this.form.get('voteFor');
  }
}
