import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateeventeComponent } from './updateevente.component';

describe('UpdateeventeComponent', () => {
  let component: UpdateeventeComponent;
  let fixture: ComponentFixture<UpdateeventeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateeventeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateeventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
