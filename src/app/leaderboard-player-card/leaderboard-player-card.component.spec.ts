import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPlayerCardComponent } from './leaderboard-player-card.component';

describe('LeaderboardPlayerCardComponent', () => {
  let component: LeaderboardPlayerCardComponent;
  let fixture: ComponentFixture<LeaderboardPlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardPlayerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardPlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
