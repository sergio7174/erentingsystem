import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRent2Component } from './edit-rent2.component';

describe('EditRent2Component', () => {
  let component: EditRent2Component;
  let fixture: ComponentFixture<EditRent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRent2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
