import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpubliciteComponent } from './listpublicite.component';

describe('ListpubliciteComponent', () => {
  let component: ListpubliciteComponent;
  let fixture: ComponentFixture<ListpubliciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpubliciteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpubliciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
