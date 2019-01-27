import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'vote-carousel',
  templateUrl: './vote-carousel.component.html',
  styleUrls: ['./vote-carousel.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class VoteCarouselComponent implements OnInit {

  constructor(private config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
  }

}
