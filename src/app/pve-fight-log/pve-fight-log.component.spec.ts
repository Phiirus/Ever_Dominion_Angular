import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PveFightLogComponent } from './pve-fight-log.component';

describe('PveFightLogComponent', () => {
  let component: PveFightLogComponent;
  let fixture: ComponentFixture<PveFightLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PveFightLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PveFightLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
