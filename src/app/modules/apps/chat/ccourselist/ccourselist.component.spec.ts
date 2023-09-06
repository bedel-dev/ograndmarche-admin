import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcourselistComponent } from './ccourselist.component';

describe('CcourselistComponent', () => {
  let component: CcourselistComponent;
  let fixture: ComponentFixture<CcourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcourselistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
