import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PveFightPageComponent } from './pve-fight-page.component';

describe('PveFightPageComponent', () => {
  let component: PveFightPageComponent;
  let fixture: ComponentFixture<PveFightPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PveFightPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PveFightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
