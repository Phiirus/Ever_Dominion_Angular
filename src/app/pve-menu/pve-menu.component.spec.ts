import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PveMenuComponent } from './pve-menu.component';

describe('PveMenuComponent', () => {
  let component: PveMenuComponent;
  let fixture: ComponentFixture<PveMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PveMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
