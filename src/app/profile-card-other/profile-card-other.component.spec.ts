import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardOtherComponent } from './profile-card-other.component';

describe('ProfileCardOtherComponent', () => {
  let component: ProfileCardOtherComponent;
  let fixture: ComponentFixture<ProfileCardOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardOtherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCardOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
