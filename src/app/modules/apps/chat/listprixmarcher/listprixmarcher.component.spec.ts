import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprixmarcherComponent } from './listprixmarcher.component';

describe('ListprixmarcherComponent', () => {
  let component: ListprixmarcherComponent;
  let fixture: ComponentFixture<ListprixmarcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListprixmarcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListprixmarcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
