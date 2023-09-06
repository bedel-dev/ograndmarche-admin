import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpubliciteComponent } from './addpublicite.component';

describe('AddpubliciteComponent', () => {
  let component: AddpubliciteComponent;
  let fixture: ComponentFixture<AddpubliciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpubliciteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpubliciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
