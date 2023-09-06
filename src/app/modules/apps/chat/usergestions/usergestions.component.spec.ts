import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergestionsComponent } from './usergestions.component';

describe('UsergestionsComponent', () => {
  let component: UsergestionsComponent;
  let fixture: ComponentFixture<UsergestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsergestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
