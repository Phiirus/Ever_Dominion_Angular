import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardStatComponent } from './profile-card-stat.component';

describe('ProfileCardStatComponent', () => {
  let component: ProfileCardStatComponent;
  let fixture: ComponentFixture<ProfileCardStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCardStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
