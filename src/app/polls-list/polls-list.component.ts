import { Router } from '@angular/Router';
import { DataParserApiService } from '../services/data-parser-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  data: any[] = [];
  constructor(private pollsListService: DataParserApiService, private router: Router) { }

  ngOnInit() {
    this.data = this.pollsListService.getDataInTable();
  }

  _delete(poll) {
    var deleteRow = confirm("Are you sure you want to delete?");
    if(deleteRow == true) {
      var id = poll.id;
      console.log("ID to be deleted", id); 
      this.pollsListService.deletePollList(id)
      .subscribe(response => {
        for (var i = 0; i < this.data.length; i++) {
            if(id === this.data[i].id) {
              this.data.splice(i,1);
            }
        }
      })
    }
  }

  _view(poll) {
    this.pollsListService.toggleHome(poll);
    this.pollsListService.storePollDataFinal(poll);
    this.router.navigate(['/view-polls']);
  }

}
