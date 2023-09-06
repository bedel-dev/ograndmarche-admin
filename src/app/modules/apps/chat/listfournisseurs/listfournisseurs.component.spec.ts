import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfournisseursComponent } from './listfournisseurs.component';

describe('ListfournisseursComponent', () => {
  let component: ListfournisseursComponent;
  let fixture: ComponentFixture<ListfournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListfournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
