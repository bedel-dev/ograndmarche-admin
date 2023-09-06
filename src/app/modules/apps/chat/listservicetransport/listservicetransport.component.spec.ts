import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListservicetransportComponent } from './listservicetransport.component';

describe('ListservicetransportComponent', () => {
  let component: ListservicetransportComponent;
  let fixture: ComponentFixture<ListservicetransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListservicetransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListservicetransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
