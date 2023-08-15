import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChatSelectedComponent } from './no-chat-selected.component';

describe('NoChatSelectedComponent', () => {
  let component: NoChatSelectedComponent;
  let fixture: ComponentFixture<NoChatSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoChatSelectedComponent]
    });
    fixture = TestBed.createComponent(NoChatSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
