import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvePlayerCardComponent } from './pve-player-card.component';

describe('PvePlayerCardComponent', () => {
  let component: PvePlayerCardComponent;
  let fixture: ComponentFixture<PvePlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PvePlayerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvePlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
