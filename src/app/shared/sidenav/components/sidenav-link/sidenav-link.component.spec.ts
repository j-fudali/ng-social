import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLinkComponent } from './sidenav-link.component';

describe('SidenavLinkComponent', () => {
  let component: SidenavLinkComponent;
  let fixture: ComponentFixture<SidenavLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidenavLinkComponent]
    });
    fixture = TestBed.createComponent(SidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
