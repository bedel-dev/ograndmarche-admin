import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergestionslistComponent } from './usergestionslist.component';

describe('UsergestionslistComponent', () => {
  let component: UsergestionslistComponent;
  let fixture: ComponentFixture<UsergestionslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergestionslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsergestionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
