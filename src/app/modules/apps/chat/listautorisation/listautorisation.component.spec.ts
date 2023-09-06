import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListautorisationComponent } from './listautorisation.component';

describe('ListautorisationComponent', () => {
  let component: ListautorisationComponent;
  let fixture: ComponentFixture<ListautorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListautorisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListautorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
