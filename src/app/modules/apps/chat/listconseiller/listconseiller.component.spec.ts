import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconseillerComponent } from './listconseiller.component';

describe('ListconseillerComponent', () => {
  let component: ListconseillerComponent;
  let fixture: ComponentFixture<ListconseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListconseillerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListconseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
