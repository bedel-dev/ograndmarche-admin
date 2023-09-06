import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandelistComponent } from './commandelist.component';

describe('CommandelistComponent', () => {
  let component: CommandelistComponent;
  let fixture: ComponentFixture<CommandelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
