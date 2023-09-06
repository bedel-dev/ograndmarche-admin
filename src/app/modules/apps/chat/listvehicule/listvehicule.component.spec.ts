import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvehiculeComponent } from './listvehicule.component';

describe('ListvehiculeComponent', () => {
  let component: ListvehiculeComponent;
  let fixture: ComponentFixture<ListvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListvehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
