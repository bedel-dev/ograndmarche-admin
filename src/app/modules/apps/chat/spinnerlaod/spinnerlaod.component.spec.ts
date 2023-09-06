import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerlaodComponent } from './spinnerlaod.component';

describe('SpinnerlaodComponent', () => {
  let component: SpinnerlaodComponent;
  let fixture: ComponentFixture<SpinnerlaodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerlaodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerlaodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
