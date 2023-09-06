import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprixmarcherComponent } from './addprixmarcher.component';

describe('AddprixmarcherComponent', () => {
  let component: AddprixmarcherComponent;
  let fixture: ComponentFixture<AddprixmarcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprixmarcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprixmarcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
