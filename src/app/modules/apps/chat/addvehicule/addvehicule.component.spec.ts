import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiculeComponent } from './addvehicule.component';

describe('AddvehiculeComponent', () => {
  let component: AddvehiculeComponent;
  let fixture: ComponentFixture<AddvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
