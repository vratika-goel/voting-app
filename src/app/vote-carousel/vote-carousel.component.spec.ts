import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCarouselComponent } from './vote-carousel.component';

describe('VoteCarouselComponent', () => {
  let component: VoteCarouselComponent;
  let fixture: ComponentFixture<VoteCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
