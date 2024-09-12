import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopCardIdleComponent } from './troop-card-idle.component';

describe('TroopCardIdleComponent', () => {
  let component: TroopCardIdleComponent;
  let fixture: ComponentFixture<TroopCardIdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TroopCardIdleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroopCardIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
