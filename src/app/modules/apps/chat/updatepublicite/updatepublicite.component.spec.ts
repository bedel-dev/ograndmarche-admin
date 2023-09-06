import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepubliciteComponent } from './updatepublicite.component';

describe('UpdatepubliciteComponent', () => {
  let component: UpdatepubliciteComponent;
  let fixture: ComponentFixture<UpdatepubliciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepubliciteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepubliciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
