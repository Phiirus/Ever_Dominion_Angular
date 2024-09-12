import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardIconComponent } from './profile-card-icon.component';

describe('ProfileCardIconComponent', () => {
  let component: ProfileCardIconComponent;
  let fixture: ComponentFixture<ProfileCardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
