import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconseilComponent } from './listconseil.component';

describe('ListconseilComponent', () => {
  let component: ListconseilComponent;
  let fixture: ComponentFixture<ListconseilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconseilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListconseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
