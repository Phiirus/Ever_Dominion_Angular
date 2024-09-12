import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxCardComponent } from './chatbox-card.component';

describe('ChatboxCardComponent', () => {
  let component: ChatboxCardComponent;
  let fixture: ComponentFixture<ChatboxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatboxCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatboxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
