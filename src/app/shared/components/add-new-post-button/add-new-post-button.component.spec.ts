import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPostButtonComponent } from './add-new-post-button.component';

describe('AddNewPostButtonComponent', () => {
  let component: AddNewPostButtonComponent;
  let fixture: ComponentFixture<AddNewPostButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddNewPostButtonComponent]
    });
    fixture = TestBed.createComponent(AddNewPostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
