import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursemontantComponent } from './addcoursemontant.component';

describe('AddcoursemontantComponent', () => {
  let component: AddcoursemontantComponent;
  let fixture: ComponentFixture<AddcoursemontantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoursemontantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoursemontantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
