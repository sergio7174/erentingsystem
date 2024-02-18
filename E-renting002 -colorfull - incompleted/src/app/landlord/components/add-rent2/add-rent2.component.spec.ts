import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRent2Component } from './add-rent2.component';

describe('AddRent2Component', () => {
  let component: AddRent2Component;
  let fixture: ComponentFixture<AddRent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRent2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
