import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetransportComponent } from './servicetransport.component';

describe('ServicetransportComponent', () => {
  let component: ServicetransportComponent;
  let fixture: ComponentFixture<ServicetransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicetransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicetransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
