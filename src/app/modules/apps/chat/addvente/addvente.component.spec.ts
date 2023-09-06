import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddventeComponent } from './addvente.component';

describe('AddventeComponent', () => {
  let component: AddventeComponent;
  let fixture: ComponentFixture<AddventeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddventeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
