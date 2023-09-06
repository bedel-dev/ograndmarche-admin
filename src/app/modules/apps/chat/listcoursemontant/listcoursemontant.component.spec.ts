import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursemontantComponent } from './listcoursemontant.component';

describe('ListcoursemontantComponent', () => {
  let component: ListcoursemontantComponent;
  let fixture: ComponentFixture<ListcoursemontantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoursemontantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoursemontantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
